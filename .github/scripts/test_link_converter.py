from link_converter import *
import pytest

@pytest.fixture
def slugs():
   return ("check-application-health-after-outage",
           "sysdig-monitor-create-alert-channels",
           "about-the-design-system"
           )
   
@pytest.fixture
def slug_dict(slugs):
   return {
      slugs[0]: "../app-monitoring/check-application-health-after-outage.md",
      slugs[1]: "../app-monitoring/sysdig-monitor-create-alert-channels.md",
      slugs[2]: "../design-system/about-the-design-system.md"
   }

@pytest.fixture
def absolute_long_content(slugs):
  return (f"Lorem ipsum dolor sit amet, [consectetur adipiscing](https://docs.developer.gov.bc.ca/{slugs[0]}/) elit. \n\r" +
         "Mauris malesuada placerat lacinia. Nam dolor est, viverra ultrices lectus non, viverra mollis leo. " +
         f"Fusce a dui auctor, [sodales](https://docs.developer.gov.bc.ca/{slugs[1]}/#anchor-to-heading) " +
         "est vel, mollis sapien. Nulla risus sapien, malesuada eu eleifend nec, consectetur et lectus. " +
         "Donec quis nisl porta, lacinia metus ac, condimentum tortor. Aenean at velit facilisis, " +
         "aliquam felis in, mattis magna. Pellentesque habitant morbi tristique senectus et netus et " +
         "malesuada fames ac turpis egestas. Lorem ipsum dolor sit amet, consectetur adipiscing elit.\n\r " +
         "Sed purus arcu, fringilla id placerat vel, efficitur nec nisl. Donec rutrum scelerisque velit, " +
         f"sed ornare massa sollicitudin a. [Quisque id finibus magna](https://docs.developer.gov.bc.ca/{slugs[2]}). " +
         "Ut a elit justo. Quisque eros sapien, eleifend quis turpis euismod, posuere elementum est. Duis " +
         "tincidunt quam risus, eu aliquet libero faucibus ac. Pellentesque mollis justo sit amet vehicula " +
         "feugiat. Nunc fermentum elementum dui sit amet rhoncus.") 


@pytest.fixture
def long_content(slugs):
   return (f"Lorem ipsum dolor sit amet, [consectetur adipiscing](/{slugs[0]}/) elit. \n\r" +
         "Mauris malesuada placerat lacinia. Nam dolor est, viverra ultrices lectus non, viverra mollis leo. " +
         f"Fusce a dui auctor, [sodales](/{slugs[1]}/#anchor-to-heading) " +
         "est vel, mollis sapien. Nulla risus sapien, malesuada eu eleifend nec, consectetur et lectus. " +
         "Donec quis nisl porta, lacinia metus ac, condimentum tortor. Aenean at velit facilisis, " +
         "aliquam felis in, mattis magna. Pellentesque habitant morbi tristique senectus et netus et " +
         "malesuada fames ac turpis egestas. Lorem ipsum dolor sit amet, consectetur adipiscing elit.\n\r " +
         "Sed purus arcu, fringilla id placerat vel, efficitur nec nisl. Donec rutrum scelerisque velit, " +
         f"sed ornare massa sollicitudin a. [Quisque id finibus magna](/{slugs[2]}). " +
         "Ut a elit justo. Quisque eros sapien, eleifend quis turpis euismod, posuere elementum est. Duis " +
         "tincidunt quam risus, eu aliquet libero faucibus ac. Pellentesque mollis justo sit amet vehicula " +
         "feugiat. Nunc fermentum elementum dui sit amet rhoncus.")

@pytest.fixture
def expected_long_content(slug_dict, slugs):
   return (f"Lorem ipsum dolor sit amet, [consectetur adipiscing]({slug_dict[slugs[0]]}) elit. \n\r" +
         "Mauris malesuada placerat lacinia. Nam dolor est, viverra ultrices lectus non, viverra mollis leo. " +
         f"Fusce a dui auctor, [sodales]({slug_dict[slugs[1]]}#anchor-to-heading) " +
         "est vel, mollis sapien. Nulla risus sapien, malesuada eu eleifend nec, consectetur et lectus. " +
         "Donec quis nisl porta, lacinia metus ac, condimentum tortor. Aenean at velit facilisis, " +
         "aliquam felis in, mattis magna. Pellentesque habitant morbi tristique senectus et netus et " +
         "malesuada fames ac turpis egestas. Lorem ipsum dolor sit amet, consectetur adipiscing elit.\n\r " +
         "Sed purus arcu, fringilla id placerat vel, efficitur nec nisl. Donec rutrum scelerisque velit, " +
         f"sed ornare massa sollicitudin a. [Quisque id finibus magna]({slug_dict[slugs[2]]}). " +
         "Ut a elit justo. Quisque eros sapien, eleifend quis turpis euismod, posuere elementum est. Duis " +
         "tincidunt quam risus, eu aliquet libero faucibus ac. Pellentesque mollis justo sit amet vehicula " +
         "feugiat. Nunc fermentum elementum dui sit amet rhoncus.")

def test_is_markdown_file():
   assert is_markdown_file("file.md")
   assert not is_markdown_file("file.txt")
   assert not is_markdown_file("file")

def test_find_all_relative_links_no_results():
   content = ""
   assert len(find_all_relative_links(content)) == 0

   content = "Lorem ipsum dolor sit ametLorem ipsum dolor sit amet"
   assert len(find_all_relative_links(content)) == 0

   # don't pick up in page anchors
   content = "[Monitoring dashboard templates](#sysdig-built-in-monitoring-dashboard-templates)"
   assert len(find_all_relative_links(content)) == 0

   # don't pick up md links
   content = "[advanced PromQL queries](./sysdig-monitor-set-up-advanced-functions.md)"
   assert len(find_all_relative_links(content)) == 0

def test_find_all_relative_links_one_link_with_anchor():
   content = "[Pathfinder SSO Keycloak](/reusable-services-list/#pathfinder-single-sign-on-keycloak)"
   result = find_all_relative_links(content)
   assert len(result) == 1
   assert result[0] == "/reusable-services-list/#pathfinder-single-sign-on-keycloak"

def test_find_all_relative_links_one_link():
   content = "[Application resiliency guidelines](/app-resiliency-guidelines/)"
   result = find_all_relative_links(content)
   assert len(result) == 1
   assert result[0] == "/app-resiliency-guidelines/"

def test_find_all_relative_links_one_link_with_extra_text():
   content = "Lorem ipsum dolor sit [Application resiliency guidelines](/app-resiliency-guidelines/) consectetur adipiscing elit. Proin ac urna nec metus m"
   result = find_all_relative_links(content)
   assert len(result) == 1
   assert result[0] == "/app-resiliency-guidelines/"

def test_find_all_relative_links_one_link_no_trailing_slash():
   content = "[Application resiliency guidelines](/app-resiliency-guidelines)"
   result = find_all_relative_links(content)
   assert len(result) == 1
   assert result[0] == "/app-resiliency-guidelines"

def  test_find_all_relative_links_multiple_links_with_extra_text(long_content, slugs):
   result = find_all_relative_links(long_content)
   assert len(result) == 3
   assert result[0] == "/{}/".format(slugs[0])
   assert result[1] == "/{}/#anchor-to-heading".format(slugs[1])
   assert result[2] == "/{}".format(slugs[2])

def test_get_filename_from_link_with_trailing_slash(slug_dict):
   result = get_filename_from_link("/check-application-health-after-outage/", slug_dict)
   assert result == "../app-monitoring/check-application-health-after-outage.md"

def test_get_filename_from_link_with_no_trailing_slash(slug_dict):
   result = get_filename_from_link("/check-application-health-after-outage", slug_dict)
   assert result == "../app-monitoring/check-application-health-after-outage.md"

def test_get_filename_from_link_with_trailing_slash_and_anchor(slug_dict):
   result = get_filename_from_link("/check-application-health-after-outage/#target-in-file", slug_dict)
   assert result == "../app-monitoring/check-application-health-after-outage.md"

def test_get_filename_from_link_with_no_trailing_slash_and_anchor(slug_dict):
   result = get_filename_from_link("/check-application-health-after-outage#target-in-file", slug_dict)
   assert result == "../app-monitoring/check-application-health-after-outage.md" 

def test_getfilename_from_link_not_in_dict(slug_dict):
   assert get_filename_from_link("/unknown-link/", slug_dict) is None
   
def test_getfilename_from_link_malformed_link(slug_dict):
   assert get_filename_from_link("whatever", slug_dict) is None
   
def test_get_relative_file_path():
   with pytest.raises(SystemExit) as error:
            get_relative_file_path("") 
   assert error.type == SystemExit
   assert error.value.code == 1

   with pytest.raises(SystemExit) as error:
            get_relative_file_path("/path/to/app-monitoring/check-application-health-after-outage.md") 
   assert error.type == SystemExit
   assert error.value.code == 1

   assert get_relative_file_path("/path/to/src/docs/app-monitoring/check-application-health-after-outage.md") == "../app-monitoring/check-application-health-after-outage.md"


def test_append_anchor():
   link = append_anchor('/check-application/#anchor-test', 'docs/check-application.md')
   assert link == 'docs/check-application.md#anchor-test'

   #no hyphens
   link = append_anchor('/check-application/#anchor', 'docs/check-application.md')
   assert link == 'docs/check-application.md#anchor'

   #no trailing slash
   link = append_anchor('/check-application#anchor-test', 'docs/check-application.md')
   assert link == 'docs/check-application.md#anchor-test'

   #alphanumeric anchor
   link = append_anchor('/check-application#anchor_test-0123456789_a', 'docs/check-application.md')
   assert link ==  'docs/check-application.md#anchor_test-0123456789_a'


def test_append_anchor_no_anchor_present():
   expected_link = 'docs/check-application.md'

   link = append_anchor('/check-application/', 'docs/check-application.md')
   assert link == expected_link

   link = append_anchor('/check-application', 'docs/check-application.md')
   assert link == expected_link

def test_find_and_replace_relative_links_one_link_with_trailing_slash(slug_dict, slugs):
   content = f"Lorem [ipsum dolor](/{slugs[0]}/) sit consectetur adipiscing elit. Proin ac urna nec metus"
   expected_content = f"Lorem [ipsum dolor]({slug_dict[slugs[0]]}) sit consectetur adipiscing elit. Proin ac urna nec metus"
   updated_content = find_and_replace_relative_links(content, slug_dict)
   assert updated_content == expected_content

def test_find_and_replace_relative_links_one_link_with_no_trailing_slash(slug_dict, slugs):
   content = f"Lorem [ipsum dolor](/{slugs[0]}) sit consectetur adipiscing elit. Proin ac urna nec metus"
   expected_content = f"Lorem [ipsum dolor]({slug_dict[slugs[0]]}) sit consectetur adipiscing elit. Proin ac urna nec metus"
   updated_content = find_and_replace_relative_links(content, slug_dict)
   assert updated_content == expected_content

def test_find_and_replace_relative_links_one_link_with_anchor(slug_dict, slugs):
   content = f"Lorem [ipsum dolor](/{slugs[0]}/#anchor-to-target) sit consectetur adipiscing elit. Proin ac urna nec metus"
   expected_content = f"Lorem [ipsum dolor]({slug_dict[slugs[0]]}#anchor-to-target) sit consectetur adipiscing elit. Proin ac urna nec metus"
   updated_content = find_and_replace_relative_links(content, slug_dict)
   assert updated_content == expected_content

def test_find_and_replace_relative_links(long_content, expected_long_content, slug_dict):
   updated_content = find_and_replace_relative_links(long_content, slug_dict)
   assert updated_content == expected_long_content

def test_find_and_replace_relative_links_unkowns_link(slug_dict):
   content = f"Lorem [ipsum dolor](/unknown-link/) sit consectetur adipiscing elit. Proin ac urna nec metus"
   assert find_and_replace_relative_links(content, slug_dict) == content
   
def test_find_all_absolute_links():
   content = ""
   assert len(find_all_absolute_links(content)) == 0

   content = "Lorem ipsum dolor sit ametLorem ipsum dolor sit amet"
   assert len(find_all_absolute_links(content)) == 0

   # don't pick up in page anchors
   content = "[Monitoring dashboard templates](#sysdig-built-in-monitoring-dashboard-templates)"
   assert len(find_all_absolute_links(content)) == 0

   # don't pick up md links
   content = "[advanced PromQL queries](sysdig-monitor-set-up-advanced-functions.md)"
   assert len(find_all_absolute_links(content)) == 0
   content = "[advanced PromQL queries](/path/to/sysdig-monitor-set-up-advanced-functions.md)"
   assert len(find_all_absolute_links(content)) == 0
   content = "[advanced PromQL queries](path/to/sysdig-monitor-set-up-advanced-functions.md)"
   assert len(find_all_absolute_links(content)) == 0

   # don't pick up non docs.developer.gov.bc.ca links
   assert len(find_all_absolute_links("[google](https://google.com)")) == 0
   assert len(find_all_absolute_links("[google](http://google.com)")) == 0
   assert len(find_all_absolute_links("[digital gov](https://digital.gov.bc.ca)")) == 0
   assert len(find_all_absolute_links("[dev gov](https://dev.developer.gov.bc.ca)")) == 0
   assert len(find_all_absolute_links("[mvp gov](https://mvp.developer.gov.bc.ca)")) == 0
   assert len(find_all_absolute_links("[DevHub link](https://developer.gov.bc.ca)")) == 0

def test_find_all_absolute_links_one_link_no_anchor():
   content = "[link text](https://docs.developer.gov.bc.ca/sysdig-monitor-onboarding/)"
   result = find_all_absolute_links(content)
   assert len(result) == 1
   assert result[0] == "https://docs.developer.gov.bc.ca/sysdig-monitor-onboarding/"

def test_find_all_absolute_links_one_link_with_anchor():
   content = "[link text](https://docs.developer.gov.bc.ca/sysdig-monitor-onboarding/#anchor-link)"
   result = find_all_absolute_links(content)
   assert len(result) == 1
   assert result[0] == "https://docs.developer.gov.bc.ca/sysdig-monitor-onboarding/#anchor-link"

   content = "[link text](https://docs.developer.gov.bc.ca/sysdig-monitor-onboarding#anchor-link)"
   result = find_all_absolute_links(content)
   assert len(result) == 1
   assert result[0] == "https://docs.developer.gov.bc.ca/sysdig-monitor-onboarding#anchor-link"

def test_find_all_absolute_links_one_link_with_extra_text():
   content = "Curabitur gravida ultrices dolor [vel ultrices](https://docs.developer.gov.bc.ca/sysdig-monitor-onboarding/). Ut a tristique est. Suspendisse potenti."
   result = find_all_absolute_links(content)
   assert len(result) == 1
   assert result[0] == "https://docs.developer.gov.bc.ca/sysdig-monitor-onboarding/"


def test_find_all_absolute_links_multiple_links_with_extra_text(absolute_long_content, slugs):
   result = find_all_absolute_links(absolute_long_content)
   assert len(result) == 3
   assert result[0] == "https://docs.developer.gov.bc.ca/{}/".format(slugs[0])
   assert result[1] == "https://docs.developer.gov.bc.ca/{}/#anchor-to-heading".format(slugs[1])
   assert result[2] == "https://docs.developer.gov.bc.ca/{}".format(slugs[2])

def test_find_and_replace_absolute_links_one_link_with_trailing_slash(slug_dict, slugs):
   content = f"Lorem [ipsum dolor](https://docs.developer.gov.bc.ca/{slugs[0]}/) sit consectetur adipiscing elit. Proin ac urna nec metus"
   expected_content = f"Lorem [ipsum dolor]({slug_dict[slugs[0]]}) sit consectetur adipiscing elit. Proin ac urna nec metus"
   updated_content = find_and_replace_absolute_links(content, slug_dict)
   assert updated_content == expected_content

def test_find_and_replace_absolute_links_one_link_with_no_trailing_slash(slug_dict, slugs):
   content = f"Lorem [ipsum dolor](https://docs.developer.gov.bc.ca/{slugs[0]}) sit consectetur adipiscing elit. Proin ac urna nec metus"
   expected_content = f"Lorem [ipsum dolor]({slug_dict[slugs[0]]}) sit consectetur adipiscing elit. Proin ac urna nec metus"
   updated_content = find_and_replace_absolute_links(content, slug_dict)
   assert updated_content == expected_content

def test_find_and_replace_absolute_links_one_link_with_anchor(slug_dict, slugs):
   content = f"Lorem [ipsum dolor](https://docs.developer.gov.bc.ca/{slugs[0]}/#anchor-to-target) sit consectetur adipiscing elit. Proin ac urna nec metus"
   expected_content = f"Lorem [ipsum dolor]({slug_dict[slugs[0]]}#anchor-to-target) sit consectetur adipiscing elit. Proin ac urna nec metus"
   updated_content = find_and_replace_absolute_links(content, slug_dict)
   assert updated_content == expected_content   


def test_find_and_replace_absolute_links_unkowns_link(slug_dict):
   content = f"Lorem [ipsum dolor](https://docs.developer.gov.bc.ca/unknown-link/) sit consectetur adipiscing elit. Proin ac urna nec metus"
   assert find_and_replace_absolute_links(content, slug_dict) == content

def test_find_and_replace_absolute_links(absolute_long_content, expected_long_content, slug_dict):
   updated_content = find_and_replace_absolute_links(absolute_long_content, slug_dict)
   assert updated_content == expected_long_content

def test_find_and_replace_wordpress_links_one_link(slugs):
   content = f"Lorem [ipsum dolor](https://docs.developer.gov.bc.ca/{slugs[0]}/#anchor-to-target) sit consectetur adipiscing [elit](%WORDPRESS_BASE_URL%/private-cloud/our-products-in-the-private-cloud-paas/monitoring-with-sysdig/). Proin ac urna nec metus"
   expected_content = f"Lorem [ipsum dolor](https://docs.developer.gov.bc.ca/{slugs[0]}/#anchor-to-target) sit consectetur adipiscing [elit](https://cloud.gov.bc.ca/private-cloud/our-products-in-the-private-cloud-paas/monitoring-with-sysdig/). Proin ac urna nec metus"
   updated_content = find_and_replace_wordpress_links(content)
   assert updated_content == expected_content

def test_find_and_replace_wordpress_links_multiple_link(slugs):
   content = f"Lorem [ipsum dolor](%WORDPRESS_BASE_URL%/private-cloud/support-and-community/platform-training-and-resources/) sit consectetur adipiscing [elit](%WORDPRESS_BASE_URL%/private-cloud/our-products-in-the-private-cloud-paas/monitoring-with-sysdig/). Proin ac urna nec metus"
   expected_content = f"Lorem [ipsum dolor](https://cloud.gov.bc.ca/private-cloud/support-and-community/platform-training-and-resources/) sit consectetur adipiscing [elit](https://cloud.gov.bc.ca/private-cloud/our-products-in-the-private-cloud-paas/monitoring-with-sysdig/). Proin ac urna nec metus"
   updated_content = find_and_replace_wordpress_links(content)
   assert updated_content == expected_content   