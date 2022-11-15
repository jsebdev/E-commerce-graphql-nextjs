def get_image_format(path):
    """
    Get the image format from the path
    """
    return path.split('.')[-1]


def fix_spaces(text):
    """
    Replace all spaces with underscores
    """
    return text.replace(' ', '_')


def replace_format(path, new_format):
    """
    Replace the image format with the new format
    """
    return '.'.join(path.split('.')[:-1]) + f'.{new_format}'
