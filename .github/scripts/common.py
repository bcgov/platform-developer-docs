import yaml

def get_front_matter(file_path):
    with open(file_path, 'r') as file:
        front_matter = {}
        lines = file.readlines()

        if lines[0].strip() == '---':
            front_matter_lines = []
            for line in lines[1:]:
                if line.strip() == '---':
                    break
                front_matter_lines.append(line)

            front_matter = yaml.safe_load(''.join(front_matter_lines))

        return front_matter
