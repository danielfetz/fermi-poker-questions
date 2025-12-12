// Enhanced question sets with hierarchical categories
export const createQuestionSets = () => {
  const categoryStructure = {
    general: {
      name: "All Categories",
      description: "This category contains all questions from across categories. It's a good place to start if you want to test your Fermi estimation skills on a wide variety of topics.",
      isParent: true,
      subcategories: []  // Will be filled with all questions
    },
    history: {
      name: "History",
      description: "Historical questions help you practice estimating figures from the past, from war casualties to economic impacts of major events.",
      isParent: true,
      subcategories: [
        {
          key: "ancient",
          name: "Ancient History",
          description: "Ancient history spans from the beginning of recorded human history to the Early Middle Ages. These questions explore the scale of ancient civilizations, monuments, and historical events.",
          questions: [
            {
  question: "How many blocks were used to build the Great Pyramid of Giza?",
  hints: [
    "The Great Pyramid of Giza is approximately 230 meters (756 ft) wide at the base and 146 meters (479 ft) tall.",
    "The average limestone block used in the pyramid weighs about 2.5 tons and measures roughly 1 cubic meter."
  ],
  answer: "Approximately 2.3 million blocks were used to build the Great Pyramid of Giza.",
  category: "Ancient History",
  source: {
    name: "Wikipedia",
    url: "https://en.wikipedia.org/wiki/Great_Pyramid_of_Giza"
  }
},
            {
              question: "What was the population of Rome at its peak in the 2nd century CE?",
              hints: [
                "Rome was the largest city in the world during this period.",
                "The city had extensive infrastructure including aqueducts that supplied water to residents."
              ],
              answer: "Approximately 1 million people lived in Rome at its peak in the 2nd century CE.",
              category: "Ancient History"
            }
          ]
        },
        {
          key: "medieval",
          name: "Medieval History",
          description: "Medieval history covers the Middle Ages from approximately the 5th to the 15th century. These questions explore population figures, castle construction, and other aspects of medieval life.",
          questions: [
            {
              question: "How many castles were built in medieval England and Wales?",
              hints: [
                "Castle-building was at its peak from the Norman Conquest in 1066 through the 13th century.",
                "Many castles were built as wooden motte-and-bailey structures and later replaced with stone."
              ],
              answer: "Approximately 1,500 castles were built in medieval England and Wales, though not all existed simultaneously.",
              category: "Medieval History"
            },
            {
              question: "What was the population of Europe before the Black Death (c. 1347)?",
              hints: [
                "The Black Death killed between 30-60% of Europe's population.",
                "Agriculture was the primary economic activity, supporting large rural populations."
              ],
              answer: "Approximately 75-80 million people lived in Europe before the Black Death.",
              category: "Medieval History"
            }
          ]
        },
        {
          key: "ww2",
          name: "World War II",
          description: "World War II (1939-1945) was a global conflict with enormous human and economic costs. These questions help you understand the scale of this pivotal event.",
          subcategories: [
            {
              key: "switzerlandWw2",
              name: "Switzerland in WWII",
              description: "Despite remaining neutral, Switzerland was significantly impacted by World War II, facing refugee crises, military mobilization, and complex economic relationships with both sides.",
              questions: [
                {
                  question: "How many refugees did Switzerland accept during WWII?",
                  hints: [
                    "Switzerland's population was about 4.2 million during WWII.",
                    "Switzerland had a controversial refugee policy that changed during the course of the war."
                  ],
                  answer: "Switzerland accepted approximately 300,000 refugees during WWII.",
                  category: "Switzerland in WWII"
                },
                {
                  question: "What was the cost of Switzerland's military mobilization during WWII?",
                  hints: [
                    "Switzerland maintained neutrality but had full military mobilization.",
                    "The Swiss GDP in the early 1940s was approximately 9-10 billion Swiss Francs annually."
                  ],
                  answer: "Around 4.5 billion Swiss Francs (approximately 18% of the country's GDP during that period).",
                  category: "Switzerland in WWII"
                },
                {
                  question: "How much gold did the Nazi regime transfer to Swiss banks?",
                  hints: [
                    "The Nazi regime looted gold from occupied countries and victims.",
                    "Swiss banks maintained their neutrality policy while continuing business."
                  ],
                  answer: "Approximately 1.7 billion Swiss Francs worth of gold (equivalent to about $400 million at the time).",
                  category: "Switzerland in WWII"
                }
              ]
            },
            {
              key: "usaWw2",
              name: "USA in WWII",
              description: "The United States' involvement in World War II transformed both the conflict and the nation itself, with massive military, industrial, and scientific mobilization.",
              questions: [
                {
                  question: "How many US soldiers died during WWII?",
                  hints: [
                    "The United States was involved in WWII from 1941 to 1945.",
                    "The US had approximately 16 million soldiers serving during the war."
                  ],
                  answer: "Approximately 405,000 US soldiers died during World War II.",
                  category: "USA in WWII"
                },
                {
                  question: "How much did the Manhattan Project cost?",
                  hints: [
                    "The Manhattan Project ran from 1942 to 1946.",
                    "It employed over 125,000 people at its peak."
                  ],
                  answer: "The Manhattan Project cost approximately $2 billion (equivalent to about $29 billion in 2023 dollars).",
                  category: "USA in WWII"
                }
              ]
            },
            {
              key: "japanWw2",
              name: "Japan in WWII",
              description: "Japan's role in World War II had profound impacts on Asia and the Pacific, culminating in the only use of nuclear weapons in warfare.",
              questions: [
                {
                  question: "How many people died in the atomic bombing of Hiroshima?",
                  hints: [
                    "Hiroshima had a population of approximately 350,000 before the bombing.",
                    "The bomb, called 'Little Boy,' was detonated about 1,900 feet above the city."
                  ],
                  answer: "Approximately 90,000-146,000 people died in Hiroshima as a result of the atomic bombing, with about half dying on the first day.",
                  category: "Japan in WWII"
                },
                {
                  question: "How many aircraft carriers did Japan have at the start of WWII?",
                  hints: [
                    "Japan was a major naval power with significant maritime capabilities.",
                    "The aircraft carrier became a crucial naval vessel during WWII."
                  ],
                  answer: "Japan had 10 aircraft carriers at the start of World War II.",
                  category: "Japan in WWII"
                }
              ]
            }
          ]
        },
        {
          key: "coldWar",
          name: "Cold War Era",
          description: "The Cold War (1947-1991) was characterized by geopolitical tension between the United States and the Soviet Union and their respective allies. These questions explore aspects of this global standoff.",
          questions: [
            {
              question: "How many nuclear weapons tests were conducted worldwide during the Cold War?",
              hints: [
                "The United States and Soviet Union were the primary nuclear powers, though not the only ones.",
                "Nuclear testing took place in the atmosphere, underwater, and underground."
              ],
              answer: "Approximately 2,000 nuclear tests were conducted worldwide during the Cold War, with the United States and Soviet Union responsible for about 85% of them.",
              category: "Cold War Era"
            },
            {
              question: "What was the total cost of the US Space Race from 1958-1969?",
              hints: [
                "The Space Race culminated in the Apollo program and the Moon landing in 1969.",
                "NASA was founded in 1958 specifically to coordinate US space efforts."
              ],
              answer: "The US spent approximately $25 billion on the Space Race from 1958-1969 (equivalent to about $175 billion in today's dollars).",
              category: "Cold War Era"
            }
          ]
        },
        {
          key: "general_history",
          name: "General Historical Events",
          description: "These questions cover significant moments in human history, from wars to social movements, and help develop estimation skills across different historical contexts.",
          questions: [
            {
              question: "How many soldiers died in World War I?",
              hints: [
                "World War I lasted from 1914 to 1918.",
                "Around 65 million soldiers were mobilized during the war."
              ],
              answer: "Approximately 9-10 million soldiers died during World War I.",
              category: "Historical Events"
            },
            {
              question: "How many people participated in the March on Washington in 1963?",
              hints: [
                "The March on Washington was one of the largest political rallies in US history.",
                "The organizers had expected around 100,000 participants."
              ],
              answer: "Approximately 250,000 people participated in the March on Washington.",
              category: "Historical Events"
            }
          ]
        }
      ]
    },
    science: {
      name: "Science & Estimation",
      description: "Science estimation questions help develop quantitative reasoning skills about the physical world, from biological processes to cosmic scales.",
      isParent: false,
      questions: [
        {
          question: "How many piano tuners are there in Chicago?",
          hints: [
            "Chicago has approximately 2.7 million residents.",
            "A piano tuner can service about 5 pianos per day, or about 1,000 pianos per year."
          ],
          answer: "Approximately 40-50 piano tuners in Chicago.",
          category: "Science & Estimation"
        },
        {
          question: "How many heartbeats does an average human have in their lifetime?",
          hints: [
            "An average human heart beats about 60-100 times per minute.",
            "The average human lifespan is around 75 years worldwide."
          ],
          answer: "About 2.5 billion heartbeats in a lifetime.",
          category: "Science & Estimation"
        },
        {
          question: "How many new cars were sold in the US in 2023?",
          hints: [
            "The US population is approximately 330 million people.",
            "On average, a car is replaced every 6-7 years."
          ],
          answer: "Around 15.5 million new cars were sold in the US in 2023.",
          category: "Science & Estimation"
        }
      ]
    },
    economics: {
      name: "Economics & Spending",
      description: "Economic Fermi questions challenge you to estimate financial figures at various scales, from personal finance to national budgets.",
      isParent: true,
      subcategories: [
        {
          key: "societalSpending",
          name: "Societal Spending",
          description: "These questions explore how governments and societies allocate resources, helping to understand the scale of public investments in different sectors.",
          questions: [
            {
              question: "How much does the US spend on healthcare annually per person?",
              hints: [
                "The US GDP is approximately $25 trillion.",
                "Healthcare spending represents about 18% of US GDP."
              ],
              answer: "Approximately $12,000-$13,000 per person annually.",
              category: "Societal Spending"
            },
            {
              question: "What is the total annual budget for public education in the US?",
              hints: [
                "There are roughly 50 million K-12 students in the US.",
                "The average spending per student is about $12,000-$15,000."
              ],
              answer: "Approximately $700 billion annually.",
              category: "Societal Spending"
            },
            {
              question: "How much does the US government spend on social security annually?",
              hints: [
                "There are about 70 million Social Security beneficiaries in the US.",
                "The average monthly Social Security benefit is around $1,500."
              ],
              answer: "Approximately $1.2 trillion annually.",
              category: "Societal Spending"
            }
          ]
        },
        {
          key: "personalFinance",
          name: "Personal Finance",
          description: "Personal finance questions help you understand individual economic behaviors and outcomes, from retirement savings to household budgeting.",
          questions: [
            {
              question: "How much does the average American save for retirement?",
              hints: [
                "The median household income in the US is about $70,000.",
                "Financial advisors recommend saving 10-15% of income for retirement."
              ],
              answer: "The median retirement savings for Americans aged 55-64 is approximately $134,000.",
              category: "Personal Finance"
            }
          ]
        },
{
  key: "businessIndustry",
  name: "Business & Industry",
  description: "These questions explore corporate metrics, market sizes, and industrial output, helping to understand the scale of commercial activities.",
  questions: [
    {
      question: "How many cars did Tesla produce in 2024?",
      hints: [
        "Tesla's production capacity across all factories was approximately 2.3 million vehicles annually at the end of 2023, but most factories weren't at full capacity year-round.",
        "In 2022, Tesla produced approximately 1.37 million vehicles."
      ],
      answer: "Tesla produced 1.77 million cars in 2024.",
      category: "Business & Industry"
    },
    {
      question: "What was Walmart's net profit margin in 2024? (in percentage)",
      hints: [
        "Walmart's total revenue was approximately $648 billion in 2024, with a net income of around $15.5 billion.",
        "Retailers like Target typically have net margins of 3-4%, while Amazon's retail operations run on margins below 2%."
      ],
      answer: "Walmart's net profit margin was 2.63% in 2024.",
      category: "Business & Industry"
    },
    {
      question: "How many bicycles are sold annually in the US?",
      hints: [
        "The US bicycle industry had annual sales of approximately $7 billion, with an average retail price of around $400 per bicycle.",
        "In a typical year, bicycle sales equal about 5-6% of the US population size, though this varies with economic conditions and trends."
      ],
      answer: "Approximately 15-18 million bicycles are sold annually in the US.",
      category: "Business & Industry"
    }
  ]
}
      ]
    },
    technology: {
      name: "Technology",
      description: "Technology estimation questions focus on the scale of digital systems, manufacturing outputs, and technical specifications across various industries.",
      isParent: false,
      questions: [
        {
          question: "How many lines of code are in the Windows operating system?",
          hints: [
            "Modern operating systems are among the most complex software ever created.",
            "The average developer writes approximately 10-50 lines of production code per day."
          ],
          answer: "Windows 10 contains approximately 50 million lines of code.",
          category: "Technology"
        },
        {
          question: "How many smartphones are sold worldwide annually?",
          hints: [
            "The global population is approximately 8 billion people.",
            "In developed countries, most people replace their smartphones every 2-3 years."
          ],
          answer: "Approximately 1.4 billion smartphones are sold annually worldwide.",
          category: "Technology"
        }
      ]
    },
    health: {
      name: "Health & Medicine",
      description: "Health and medicine questions explore the scale of healthcare systems, medical statistics, and pharmaceutical industries around the world.",
      isParent: false,
      questions: [
        {
          question: "How many pharmacies are there in Russia?",
          hints: [
            "Russia had a population of around 144 million in 2024.",
            "There are around 12,300 pharmacies in Poland."
          ],
          answer: "81,700",
          category: "Health & Medicine"
        }
      ]
    },
    test: {
      name: "Test",
      description: "A temporary collection of diverse Fermi estimation questions covering occupations, business metrics, and everyday quantities.",
      isParent: false,
      questions: [
        {
          question: "How many dentists are there in the United States?",
          hints: [
            "The US population is approximately 330 million people.",
            "The American Dental Association recommends visiting a dentist twice per year, and a typical dentist can see about 2,000 patients annually."
          ],
          answer: "Approximately 200,000 dentists practice in the United States.",
          category: "Test"
        },
        {
          question: "How many pizzas are consumed in the US each day?",
          hints: [
            "About 13% of Americans eat pizza on any given day.",
            "The US population is approximately 330 million people."
          ],
          answer: "Approximately 100 million pizzas are consumed daily in the United States.",
          category: "Test"
        },
        {
          question: "How many commercial airline flights take off globally each day?",
          hints: [
            "There are approximately 45,000 airports worldwide, though only about 5,000 have paved runways over 8,000 feet.",
            "Major airports like Atlanta handle over 2,500 flights per day."
          ],
          answer: "Approximately 100,000 commercial flights take off globally each day.",
          category: "Test"
        },
        {
          question: "How many barbers work in New York City?",
          hints: [
            "New York City has a population of approximately 8.3 million people.",
            "About half the population regularly gets haircuts at barbershops, and a barber can serve about 15-20 clients per day."
          ],
          answer: "Approximately 12,000-15,000 barbers work in New York City.",
          category: "Test"
        },
        {
          question: "How many golf balls are lost each year in the United States?",
          hints: [
            "There are approximately 25 million golfers in the United States.",
            "The average golfer loses about 1-2 balls per round and plays around 20 rounds per year."
          ],
          answer: "Approximately 300-400 million golf balls are lost annually in the United States.",
          category: "Test"
        },
        {
          question: "How many elevators are there in New York City?",
          hints: [
            "New York City has approximately 1 million buildings, with about 47,000 being high-rises or mid-rises.",
            "Manhattan alone has about 10,000 buildings over 6 stories tall."
          ],
          answer: "Approximately 70,000-80,000 elevators operate in New York City.",
          category: "Test"
        },
        {
          question: "How many accountants are employed in the United Kingdom?",
          hints: [
            "The UK has a population of approximately 67 million people.",
            "The UK is known as a global financial center with London being one of the world's largest financial hubs."
          ],
          answer: "Approximately 350,000-400,000 accountants are employed in the United Kingdom.",
          category: "Test"
        },
        {
          question: "How many cups of coffee are consumed daily in the United States?",
          hints: [
            "About 65% of American adults drink coffee daily.",
            "The average coffee drinker consumes about 3 cups per day."
          ],
          answer: "Approximately 400-500 million cups of coffee are consumed daily in the US.",
          category: "Test"
        },
        {
          question: "How many McDonald's restaurants are there worldwide?",
          hints: [
            "McDonald's operates in over 100 countries.",
            "The United States alone has approximately 14,000 McDonald's locations."
          ],
          answer: "Approximately 40,000 McDonald's restaurants operate worldwide.",
          category: "Test"
        },
        {
          question: "How many plumbers are there in Germany?",
          hints: [
            "Germany has a population of approximately 83 million people.",
            "Germany has about 42 million households, and plumbing services are needed regularly for maintenance and repairs."
          ],
          answer: "Approximately 50,000-60,000 plumbers work in Germany.",
          category: "Test"
        },
        {
          question: "How many taxis operate in London?",
          hints: [
            "London has a population of approximately 9 million people.",
            "The famous black cabs require drivers to pass 'The Knowledge' test, which takes 2-4 years to complete."
          ],
          answer: "Approximately 21,000 licensed black cabs operate in London, plus about 90,000 private hire vehicles.",
          category: "Test"
        },
        {
          question: "How many emails are sent globally each day?",
          hints: [
            "There are approximately 4 billion email users worldwide.",
            "The average office worker receives about 120 emails per day."
          ],
          answer: "Approximately 300-350 billion emails are sent globally each day.",
          category: "Test"
        },
        {
          question: "How many restaurants are there in Tokyo?",
          hints: [
            "Tokyo has a population of approximately 14 million in the city proper and 37 million in the greater metropolitan area.",
            "Tokyo has more Michelin-starred restaurants than any other city in the world."
          ],
          answer: "Approximately 80,000-90,000 restaurants operate in Tokyo.",
          category: "Test"
        },
        {
          question: "How many teachers work in public schools in the United States?",
          hints: [
            "There are approximately 50 million K-12 students in US public schools.",
            "The average class size in the US is about 15-20 students."
          ],
          answer: "Approximately 3.2-3.5 million teachers work in US public schools.",
          category: "Test"
        },
        {
          question: "How many ATMs are there in the United States?",
          hints: [
            "The US population is approximately 330 million people.",
            "Banks, convenience stores, and many retail locations have ATMs, with major banks having ATMs at most of their branches."
          ],
          answer: "Approximately 450,000-500,000 ATMs operate in the United States.",
          category: "Test"
        },
        {
          question: "How many veterinarians practice in the United States?",
          hints: [
            "There are approximately 90 million pet dogs and 74 million pet cats in the US.",
            "A typical veterinary practice might have 2-3 veterinarians and serve a few thousand pet-owning households."
          ],
          answer: "Approximately 120,000-130,000 veterinarians practice in the United States.",
          category: "Test"
        },
        {
          question: "How many hotel rooms are there in Las Vegas?",
          hints: [
            "Las Vegas hosts approximately 40 million visitors per year.",
            "Some of the largest hotels in the world are located in Las Vegas, with properties like the Venetian having over 7,000 rooms."
          ],
          answer: "Approximately 150,000-170,000 hotel rooms are available in Las Vegas.",
          category: "Test"
        },
        {
          question: "How many tons of bananas are consumed annually worldwide?",
          hints: [
            "Bananas are the world's most popular fruit and are a dietary staple in many tropical countries.",
            "The average American eats about 27 pounds of bananas per year."
          ],
          answer: "Approximately 100-115 million metric tons of bananas are consumed annually worldwide.",
          category: "Test"
        },
        {
          question: "How many real estate agents are licensed in California?",
          hints: [
            "California has a population of approximately 39 million people.",
            "California has one of the most active real estate markets in the US, with median home prices over $700,000."
          ],
          answer: "Approximately 400,000-450,000 real estate agents are licensed in California.",
          category: "Test"
        },
        {
          question: "How many gas stations are there in the United States?",
          hints: [
            "There are approximately 280 million registered vehicles in the United States.",
            "The average driver fills up about once per week, and a busy gas station might serve 1,000 customers per day."
          ],
          answer: "Approximately 145,000-150,000 gas stations operate in the United States.",
          category: "Test"
        }
      ]
    }
  };

  // Helper function to flatten categories and collect all questions
  const flattenCategories = (category) => {
    let questions = [];
    
    if (category.isParent && category.subcategories) {
      for (const subcat of category.subcategories) {
        if (subcat.subcategories) {
          for (const nestedSubcat of subcat.subcategories) {
            if (nestedSubcat.questions) {
              questions = [...questions, ...nestedSubcat.questions];
            }
          }
        }
        if (subcat.questions) {
          questions = [...questions, ...subcat.questions];
        }
      }
    } else if (category.questions) {
      questions = [...questions, ...category.questions];
    }
    
    return questions;
  };
  
  // Collect all questions for the general category
  let allQuestions = [];
  for (const categoryKey in categoryStructure) {
    if (categoryKey !== 'general') {
      allQuestions = [...allQuestions, ...flattenCategories(categoryStructure[categoryKey])];
    }
  }
  
  // Assign all questions to the general category
  categoryStructure.general.questions = allQuestions;
  
  return categoryStructure;
};
