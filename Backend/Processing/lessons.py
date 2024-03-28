import json

files = [
    "A1",
    "A2",
    "B1",
    "B2",
    "C1",
]


def __load_categories():
    data = {}

    for file in files:
        f = open(f'./Data/{file}.json', "r")
        data.update(json.load(f)[file])
        f.close()

    return [category for category in data.keys()]

def get_categories_keys() ->list[str]:
    return __load_categories()