from patcher import patch

def test_ignores_bullets_in_code_blocks():
  input = """```yaml
example:
  - item1 
  - item2
``` 
"""
  result = patch(input.splitlines(True))
  result = ''.join(result)
  assert result == input

def test_bullets_formatted_outside_of_code_blocks():
  input = """introduction sentence
  - item1 
  - item2
"""  
  expected_result = """introduction sentence

- item1 
  - item2
"""  

  result = patch(input.splitlines(True))
  result = ''.join(result)
  assert result == expected_result

# 4 backticks escapes code blocks. Used in markdown when you want to display the markdown for a code block
def test_ignore_bullets_in_escaped_code_blocks():
  input = """````
```yaml
example:
  - item1 
  - item2
``` 
````
""" 
  result = patch(input.splitlines(True))
  result = ''.join(result)
  assert result == input

# Test a more complex case. Escaped code block, bulletted list and another code block
def test_code_blocks_and_bullets():
  input = """````
```yaml
example:
  - item1 
  - item2
``` 
````
another line
 - bullet 1
- bullet 2

more code
```
something:
- x
- y
```
""" 

  expected_result =  """````
```yaml
example:
  - item1 
  - item2
``` 
````
another line

- bullet 1
- bullet 2

more code
```
something:
- x
- y
```
""" 

  result = patch(input.splitlines(True))
  result = ''.join(result)
  assert result == expected_result