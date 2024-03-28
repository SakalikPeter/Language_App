import json

def __load_json(file: str) -> dict:
    f = open(f'./Data/{file}.json', "r")
    data = json.load(f)
    f.close()

    return data

def get_all_categories() -> list[str]:
    files = [
        "A1",
        "A2",
        "B1",
        "B2",
        "C1",
    ]
    data = {}
    for file in files:
        data.update(__load_json(file)[file])
    return [category for category in data.keys()]

def get_words_by_category(
    category: str,
) -> list[str]:
    files = [
        "A1",
        "A2",
        "B1",
        "B2",
        "C1",
    ]
    data = {}
    for file in files:
        data.update(__load_json(file)[file])
    return ", ".join([item["word"] for item in data[category]])

def get_all_lessons(
    language: str = "en"
) -> list[object]:
    return __load_json(
        file=f"lessons_{language}",
    )[language]