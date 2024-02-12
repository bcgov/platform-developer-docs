from mkdocs import *

def mkdirs(tmp_path, dir_names):
  for dir in dir_names:      
    d = tmp_path / dir
    d.mkdir()

def test_happy_path(tmp_path):
  dir_names = [ 
      "app-monitoring",
      "automation-and-resiliency",
      "build-deploy-and-maintain-apps", 
      "database-and-api-management",
      "design-system",
      "openshift-projects-and-access",
      "platform-architecture-reference",
      "reusable-code-and-services",
      "security-and-privacy-compliance",
      "training-and-learning"
     ]
  mkdirs(tmp_path, dir_names)
  assert are_categories_valid(get_categories(), tmp_path) 


def test_same_number_of_dirs_but_diff_names(tmp_path):
  dir_names = [ 
    "aaaa",
    "automation-and-resiliency",
    "build-deploy-and-maintain-apps", 
    "database-and-api-management",
    "openshift-projects-and-access",
    "platform-architecture-reference",
    "reusable-code-and-services",
    "security-and-privacy-compliance",
    "training-and-learning"
    ]
  mkdirs(tmp_path, dir_names)
  assert are_categories_valid(get_categories(), tmp_path) == False

def test_diff_num_of_dirs(tmp_path): 
  dir_names = [ 
      "app-monitoring",
      "automation-and-resiliency",
      "build-deploy-and-maintain-apps", 
      "database-and-api-management"
     ]
  mkdirs(tmp_path, dir_names)
  assert are_categories_valid(get_categories(), tmp_path)  == False


def test_create_yaml_structure():
  nav_entries = { "category-1" :
                  [
                    {"title 1" : "/path/to/file1.md"},
                    {"title 2" : "/path/to/file2.md"}
                  ],
                  "category-2" :
                  [{"title 3" : "file3.md"}]
                }
  
  expected_mkdocs = {'site_name': 'BC Government Private Cloud Technical Documentation', 
          'docs_dir': 'src', 
          'nav': nav_entries,
          'plugins': ['techdocs-core', 'ezlinks'],
           'markdown_extensions': ['md_in_html', {'mkpatcher': {'location': 'patcher.py'}}],
          'exclude_docs': 'drafts/\ncomponents/\nhooks/\npages/\nutils/\n'}
  
  mkdocs = create_yaml_structure(nav_entries)
  assert mkdocs == expected_mkdocs 

def test_get_sub_name_happy_path():
  docs =  [("title 1", "path/to/file1", 3),
           ("title 2", "path/to/file2", 1),
           ("title 3", "path/to/file3", 2),
           ]
  heading = "sub heading"
  expected = { heading  :  
              [
                {"title 2" : "path/to/file2"},
                {"title 3" : "path/to/file3"},
                {"title 1" : "path/to/file1"}
              ]
            }
  result = get_sub_nav(docs, heading)
  assert result == expected

def test_get_sub_name_same_sort_order():
  docs =  [("title 1", "path/to/file1", 3),
           ("title 2", "path/to/file2", 3),
           ("title 3", "path/to/file3", 2),
           ]
  heading = "sub heading"
  expected = { heading  :  
              [
                {"title 3" : "path/to/file3"},
                {"title 1" : "path/to/file1"},
                {"title 2" : "path/to/file2"}
              ]
            }
  result = get_sub_nav(docs, heading)
  assert result == expected

def test_get_sub_name_no_docs():
  docs = []
  heading = "sub heading"
  expected = { heading  :  [] }
  result = get_sub_nav(docs, heading)
  assert result == expected
  