import os
import re
import logging
import sys
from common import get_front_matter
        

def get_filename_from_link(link, slug_dict):
  match = re.search(r".*\/([a-zA-Z0-9-]+)\/?", link)
  if match:
    norm_link = match.group(1)
    if norm_link in slug_dict:
      return slug_dict[norm_link]
    else:
      logging.error(f"Could not find file in dict for {norm_link} ")
      return None
  else:
    logging.error(f"Could not get link from {link}")
    return None
  
def append_anchor(link, file_link):
  # append anchor to file_link if an anchor existed
  match = re.search(r".*/?(#{1}[a-zA-Z0-9_-]+)",link)
  if(match):
    anchor = match.group(1)
    file_link = file_link + anchor
  return file_link

def replace_links(content, links_to_replace, slug_dict):
  for link in links_to_replace:
    file_link = get_filename_from_link(link, slug_dict)
    if(file_link):
      file_link = append_anchor(link, file_link)
      content = content.replace(f"]({link})", f"]({file_link})")
    else:
      logging.error(f"Could not get link path for {link}")
  return content

def find_all_relative_links(content):
   return re.findall(r'\[.*?\]\((/.*?)\)', content)

def find_and_replace_relative_links(content, slug_dict):
  relative_links = find_all_relative_links(content)
  return replace_links(content, relative_links, slug_dict)
    

def find_all_absolute_links(content):
  return re.findall(r'\[.*?\]\((http[s]?://docs\.developer\.gov\.bc\.ca/.*?)\)', content)

  
def find_and_replace_absolute_links(content, slug_dict):
  absolute_links = find_all_absolute_links(content)
  return replace_links(content, absolute_links, slug_dict)

def find_and_replace_wordpress_links(updated_content):
  return updated_content.replace("%WORDPRESS_BASE_URL%", "https://cloud.gov.bc.ca")

def find_and_replace_links(file_path, slug_dict):
  logging.debug(f"Processing: {file_path}")
  with open(file_path, 'r') as file:
    content = file.read()
    updated_content = find_and_replace_relative_links(content, slug_dict)
    updated_content = find_and_replace_absolute_links(updated_content, slug_dict)
    updated_content = find_and_replace_wordpress_links(updated_content)
  
  if updated_content != content:
    with open(file_path, 'w') as file:
      file.write(updated_content)
    

def process_directory(directory, slug_dict):
  for root, _, files in os.walk(directory):
    for file_name in files:
      if file_name.endswith('.md'):
        file_path = os.path.join(root, file_name)
        find_and_replace_links(file_path, slug_dict)

def is_markdown_file(file_name):
   return file_name.endswith('.md')

def format_relative_file_path(file_path):
  if file_path:
    prefix = ".." if file_path.startswith("/") else "../"
    return f"{prefix}{file_path}"
  
def get_relative_file_path(file_path):
  # This assumes the documents live in src/docs/ subdirectory: 
  # /path/to/private-cloud-techdocs/src/docs/category/
  match = re.search(r"/src/docs/(.*)", file_path)
  if(match):
    return format_relative_file_path(match.group(1))
  else:
    logging.error(f"Could not parse relative file path for file {file_path}")
    sys.exit(1)
  
def get_slug_files(directory):

  # Initialize with redirects - the existing documentation links to URLs that don't exist 
  # So, point those URLs to the md files manually.
  slug_dict = {
     "cicd-pipeline-templates-for-private-cloud-teams" : format_relative_file_path("automation-and-resiliency/cicd-pipeline-templates-for-private-cloud-teams.md"),
    "argo-cd-shared-instances" : format_relative_file_path("automation-and-resiliency/argo-cd-usage.md") ,
    "devops-security-compliance": format_relative_file_path("security-and-privacy-compliance/platform-security-compliance.md"),
    "best-practices-for-managing-image-streams": format_relative_file_path("build-deploy-and-maintain-apps/imagestreams.md")
  }

  for root, dirs, files in os.walk(directory):
    markdown_files = filter(is_markdown_file, files)
    for file in markdown_files:
      file_path = os.path.join(root, file)
      front_matter = get_front_matter(file_path)
      if 'slug' in front_matter:
        relative_file_path = get_relative_file_path(file_path)
        if(relative_file_path):
          slug_dict[front_matter['slug']] = relative_file_path
        else:
          logging.error(f"Did not add {file_path} to slug_dict")
          sys.exit(1)

  
  return slug_dict
               

if __name__ == "__main__":
  logging.basicConfig(level=logging.INFO)
  if len(sys.argv) < 1:
    logging.error("Usage: python link_converter.py directory_path")
    sys.exit(1)
  target_directory = sys.argv[1]
  if not os.path.isdir(target_directory):
    logging.error(f"{target_directory} is not valid")
    sys.exit(1)
  else:
    logging.info(f"Updating files in {target_directory}")
    slug_dict = get_slug_files(target_directory)
    process_directory(target_directory, slug_dict)
    logging.info("Done")
