import os
import sys
import yaml
from collections import OrderedDict
import logging
import re
from common import get_front_matter


def get_categories():
    # The order the categories are listed here are how they are listed in the navigation on the site
    categories = OrderedDict()
    categories["build-deploy-and-maintain-apps"] = "Build, deploy and maintain apps"
    categories["openshift-projects-and-access"] = "OpenShift projects and access"
    categories["automation-and-resiliency"] = "Automation and resiliency"
    categories["app-monitoring"] = "App monitoring"
    categories["database-and-api-management"] = "Database and API management"                     
    categories["security-and-privacy-compliance"] = "Security and privacy compliance"
    categories["reusable-code-and-services"] = "Reusable code and services"
    categories["platform-architecture-reference"] = "Platform architecture reference"
    categories["training-and-learning"] = "Training and learning"
    categories["design-system"] = "Design system"
    return categories

def are_categories_valid(categories, root_path):
  dirs = os.listdir(root_path)
  if len(dirs) != len(categories.keys()):
    return False
  else:
      k = list(categories.keys())
      k.sort()
      dirs.sort()
      return dirs == k
      

def get_relative_file_path(file_path):
  # This assumes the documents live in src/docs/ subdirectory: 
  # /path/to/private-cloud-techdocs/src/docs/category/
  match = re.search(r"/src/(docs/.*)", file_path)
  if(match):
    return match.group(1)
  else:
    logging.error(f"Could not parse relative file path for file {file_path}")
    sys.exit(1)
  
def get_sub_nav(doc_files, subhead_name):
  sorted_data = sorted(doc_files, key=lambda x: (x[2], x[1]))  
  transformed_data = OrderedDict((title, path) for title, path, _ in sorted_data)
  sub_nav = {subhead_name: []}
  for title, path in transformed_data.items():
    logging.debug(f"{title} : {path}")
    sub_nav[subhead_name].append({title: path})  
  return sub_nav

def generate_nav_entries(root_path, categories):
    nav_entries = []
    for k, v in categories.items():
        dir_path = os.path.join(root_path, k)
        doc_files = []
        for root, _, files in os.walk(dir_path):
            for file_name in files:
                logging.debug(f"Processing {file_name}")
                if file_name.endswith('.md'):
                    file_path = os.path.join(root, file_name)
                    relative_file_path = get_relative_file_path(file_path)
                    front_matter = get_front_matter(file_path)
                    sort_order = 5 #default to something if sort_order doesn't exist
                    if 'sort_order' in front_matter:
                        sort_order = front_matter['sort_order']        
                    if 'title' in front_matter:
                        doc_files.append(
                            (front_matter['title'], relative_file_path, sort_order))
                    else: 
                       logging.error(f"Missing title slug in frontmatter for {file_path}")

        sub_nav = get_sub_nav(doc_files, v)
        nav_entries.append(sub_nav)
        
    return nav_entries

def str_presenter(dumper, data):
    """configures yaml for dumping multiline strings
    Ref: https://stackoverflow.com/questions/8640959/how-can-i-control-what-scalar-form-pyyaml-uses-for-my-data"""
    if data.count('\n') > 0:  # check for multiline string
        return dumper.represent_scalar('tag:yaml.org,2002:str', data, style='|')
    return dumper.represent_scalar('tag:yaml.org,2002:str', data)

def create_yaml_structure(nav_entries):
  mkdocs = {
    'site_name':'BC Government Private Cloud Technical Documentation',
    'docs_dir':'src',
    'nav': nav_entries,
    'plugins': ['techdocs-core', 'ezlinks'],
    'markdown_extensions': ['md_in_html'],
    'exclude_docs': 'drafts/\ncomponents/\nhooks/\npages/\nutils/\n'
  }

  return mkdocs

def write_yaml_file(output_file, mkdocs):
  with open(output_file, 'w') as file:                 
    yaml.add_representer(str, str_presenter)
    # https://stackoverflow.com/a/63126400/4704303
    yaml.dump(mkdocs, file, default_flow_style=False, sort_keys=False)

def generate_mkdocs_yml(root_path, output_file='mkdocs.yml'):
  categories = get_categories()
  if not are_categories_valid(categories, root_path):
     logging.error(f"The hardcoded categories and directory structure in {root_path} do not match. Fix it before proceeding")
     sys.exit(1)
  else:
    nav_entries = generate_nav_entries(root_path, categories)
    mkdocs = create_yaml_structure(nav_entries)
    write_yaml_file(output_file, mkdocs)
        

if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO)
    if len(sys.argv) < 2:
        logging.error("Usage: python mkdocs.py directory_path [path/to/mkdocs.yml]")
        sys.exit(1)
    
    logging.info("Making mkdocs yaml file...")
    directory_path = sys.argv[1]
    if len(sys.argv) > 2:
        generate_mkdocs_yml(directory_path, sys.argv[2])
    else:
        generate_mkdocs_yml(directory_path) 
    logging.info("Done")
  
    
