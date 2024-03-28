
words_dict = {
    "Animals (A1)": [
        "dog (noun)",
        "cat (noun)",
        "horse (noun)",
        "rabbit (noun)",
        "hamster (noun)", 
    ],
    "Clothes (A1)": [
        "hat (noun)",
        "shirt (noun)",
        "jeans (noun)",
        "wear (verb)",
        "sock (noun)",
    ],
    "Verbs I.": [
        "eat (verb)",
        "drink (verb)",
        "play (verb)",
        "swim (verb)",
        "jump (verb)",
    ],
    "Verbs II.": [
        "sing (verb)",
        "paint (verb)",
        "draw (verb)",
        "walk (verb)",
        "dance (verb)",
    ]
}

simple_present = {
    "Beginner": [
        "I play soccer.",
        "She reads books.",
        "We eat lunch at noon.",
        "He walks to school every day.",
        "They watch TV in the evening.",
        "I like ice cream.",
        "She speaks English.",
        "We go to the park on Sundays.",
        "He brushes his teeth before bed.",
        "I listen to music.",
        "The cat sleeps on the couch.",
        "We live in a big house.",
        "She helps her mom with chores.",
        "I drink water.",
        "He runs in the morning.",
        "They study math.",
        "I have a pet dog.",
        "She wears a blue dress.",
        "We visit Grandma on weekends.",
        "He plays the guitar.",
    ],
    "Intermediate": [
        "I eat breakfast every morning.",
        "She works in a hospital.",
        "We play tennis on weekends.",
        "The sun rises in the east.",
        "They speak Spanish fluently.",
        "My sister lives in New York.",
        "He drinks coffee in the afternoon.",
        "The cat sleeps on the couch.",
        "We study English grammar.",
        "He goes to the gym regularly.",
        "The train arrives at 7:00 AM.",
        "She often visits her grandparents.",
        "I enjoy reading novels.",
        "They walk to school every day.",
        "The Earth revolves around the sun.",
        "We watch movies on Fridays.",
        "He teaches math at the university.",
        "I usually take a shower in the evening.",
        "The company produces high-quality products.",
        "They clean their room every weekend.",
    ],
    "Expert": [
        "Experts analyze data to draw meaningful conclusions.",
        "They conduct experiments to test hypotheses.",
        "Experts in the field publish research findings regularly.",
        "They attend conferences to stay updated on the latest advancements.",
        "Professionals in the industry often collaborate on research projects.",
        "Experts design innovative solutions to address complex problems.",
        "They utilize cutting-edge technology in their work.",
        "Professionals present their findings at international forums.",
        "Experts often mentor and guide junior researchers.",
        "They review scientific literature to stay informed.",
        "Professionals in the field lead workshops and training sessions.",
        "Experts develop and refine methodologies for accurate results.",
        "They apply statistical methods to analyze data sets.",
        "Professionals in the domain use specialized software tools.",
        "Experts collaborate with interdisciplinary teams.",
        "They communicate their research through publications.",
        "Professionals stay abreast of industry best practices.",
        "Experts teach courses to share their knowledge.",
        "They consult with organizations on specialized projects.",
        "Professionals contribute to the advancement of their field through continuous learning.",
    ],
    "Business": [
        "The team analyzes market trends regularly to identify potential opportunities.",
        "Our company manufactures high-quality products for various industries.",
        "The CEO addresses shareholders during the annual meeting to discuss financial performance.",
        "We conduct weekly meetings to update the team on project progress.",
        "The sales team presents the new product features to potential clients.",
        "Our customer service department assists clients with inquiries and resolves issues promptly.",
        "Employees submit their monthly reports to track individual and team achievements.",
        "The finance department manages budget allocations to ensure financial stability.",
        "The company values diversity and promotes an inclusive work environment.",
        "Our HR team recruits talented professionals to enhance the workforce.",
        "The marketing team develops compelling content for our social media channels.",
        "The IT department maintains and updates the company's technological infrastructure.",
        "Managers lead training sessions to improve employee skills and performance.",
        "The procurement team negotiates contracts with suppliers to secure cost-effective deals.",
        "The legal department reviews contracts and ensures compliance with regulations.",
        "Our company prioritizes environmental sustainability in its business practices.",
        "The CEO communicates the company's vision and mission to inspire employees.",
        "Employees participate in regular professional development programs.",
        "The company values transparent communication to foster a collaborative workplace.",
        "We celebrate employee achievements during monthly recognition events.",
    ]
}


def __get_words(
    vocabulary: str,
) -> list[str]:
    vocabulary = vocabulary.split(',')
    result = []

    for v in vocabulary:
        if v in words_dict:
            result.extend(words_dict[v])

    return result

def __get_sentences(
    tense: str,
    level: str,
    words: str,
) -> list[str]:
    return simple_present[level]

def get_sentences(
    tense: str,
    level: str,
    vocabulary: str
):
    words = __get_words(
        vocabulary=vocabulary
    )
    return __get_sentences(
        tense=tense,
        level=level,
        words=words,
    )