import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Dimensions } from 'react-native';
import * as d3 from 'd3';
import { useEscapeKey } from './useEscapeKey';
import { Platform } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  svgContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    color: '#888',
    fontSize: 14,
    marginBottom: 20,
    textAlign: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
    zIndex: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  icon: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    opacity: 0.7,
    zIndex: 5,
    top: 20,
    right: 20,
  },
});

// 2022 World Cup knockout stage data
const worldCup2022Data = {
  name: "2022 FIFA World Cup",
  children: [
    {
      name: "Round of 16",
      round: 1,
      matches: [
        {
          home: "Netherlands",
          away: "United States", 
          score: "3-1",
          winner: "Netherlands"
        },
        {
          home: "Argentina",
          away: "Australia",
          score: "2-1", 
          winner: "Argentina"
        },
        {
          home: "France",
          away: "Poland",
          score: "3-1",
          winner: "France"
        },
        {
          home: "England", 
          away: "Senegal",
          score: "3-0",
          winner: "England"
        },
        {
          home: "Japan",
          away: "Croatia",
          score: "1-1 (3-4p)",
          winner: "Croatia"
        },
        {
          home: "Brazil",
          away: "South Korea", 
          score: "4-1",
          winner: "Brazil"
        },
        {
          home: "Morocco",
          away: "Spain",
          score: "0-0 (3-0p)",
          winner: "Morocco"
        },
        {
          home: "Portugal",
          away: "Switzerland",
          score: "6-1",
          winner: "Portugal"
        }
      ]
    },
    {
      name: "Quarter-finals",
      round: 2,
      matches: [
        {
          home: "Croatia",
          away: "Brazil",
          score: "1-1 (4-2p)",
          winner: "Croatia"
        },
        {
          home: "Netherlands",
          away: "Argentina", 
          score: "2-2 (3-4p)",
          winner: "Argentina"
        },
        {
          home: "Morocco",
          away: "Portugal",
          score: "1-0",
          winner: "Morocco"
        },
        {
          home: "England",
          away: "France",
          score: "1-2", 
          winner: "France"
        }
      ]
    },
    {
      name: "Semi-finals",
      round: 3,
      matches: [
        {
          home: "Argentina",
          away: "Croatia",
          score: "3-0",
          winner: "Argentina"
        },
        {
          home: "France",
          away: "Morocco",
          score: "2-0",
          winner: "France"
        }
      ]
    },
    {
      name: "Final",
      round: 4,
      matches: [
        {
          home: "Argentina",
          away: "France",
          score: "3-3 (4-2p)",
          winner: "Argentina"
        }
      ]
    }
  ]
};

export default function Art3({ navigation }) {
  const svgRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 1500, height: 1200 });
  
  // Add escape key functionality for web
  useEscapeKey(() => navigation.goBack());

  // Update dimensions on mount and resize
  useEffect(() => {
    const updateDimensions = () => {
      const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
      setDimensions({
        width: Math.min(screenWidth - 40, 1400),
        height: Math.min(screenHeight - 200, 900)
      });
    };

    updateDimensions();
    
    if (Platform.OS === 'web') {
      window.addEventListener('resize', updateDimensions);
      return () => window.removeEventListener('resize', updateDimensions);
    }
  }, []);

  // Transform World Cup data to complete elimination phase tree
function createCompleteEliminationTree(worldCupData) {
const wrldCup = JSON.parse(
  `{
  "name": "FIFA World Cup",
  "children": [
    {
      "name": "1930 World Cup",
      "round": "world-cup",
      "match": "Uruguay vs Argentina",
      "score": "4x2",
      "winner": "Uruguay",
      "children": [
        {
          "name": "Argentina v United States",
          "round": "semi-finals",
          "match": "Argentina vs United States",
          "score": "6x1",
          "winner": "Argentina",
          "children": []
        },
        {
          "name": "Uruguay v Yugoslavia",
          "round": "semi-finals",
          "match": "Uruguay vs Yugoslavia",
          "score": "6x1",
          "winner": "Uruguay",
          "children": []
        }
      ]
    },
    {
      "name": "1934 World Cup",
      "round": "world-cup",
      "match": "Italy vs Czechoslovakia",
      "score": "2x1",
      "winner": "Italy",
      "children": [
        {
          "name": "Czechoslovakia v Germany",
          "round": "semi-finals",
          "match": "Czechoslovakia vs Germany",
          "score": "3x1",
          "winner": "Czechoslovakia",
          "children": [
            {
              "name": "Austria v Hungary",
              "round": "quarter-finals",
              "match": "Austria vs Hungary",
              "score": "2x1",
              "winner": "Austria",
              "children": [
                {
                  "name": "Austria v France",
                  "round": "round-of-16",
                  "match": "Austria vs France",
                  "score": "3x2",
                  "winner": "Austria",
                  "children": []
                },
                {
                  "name": "Czechoslovakia v Romania",
                  "round": "round-of-16",
                  "match": "Czechoslovakia vs Romania",
                  "score": "2x1",
                  "winner": "Czechoslovakia",
                  "children": []
                }
              ]
            },
            {
              "name": "Czechoslovakia v Switzerland",
              "round": "quarter-finals",
              "match": "Czechoslovakia vs Switzerland",
              "score": "3x2",
              "winner": "Czechoslovakia",
              "children": [
                {
                  "name": "Germany v Belgium",
                  "round": "round-of-16",
                  "match": "Germany vs Belgium",
                  "score": "5x2",
                  "winner": "Germany",
                  "children": []
                },
                {
                  "name": "Hungary v Egypt",
                  "round": "round-of-16",
                  "match": "Hungary vs Egypt",
                  "score": "4x2",
                  "winner": "Hungary",
                  "children": []
                }
              ]
            }
          ]
        },
        {
          "name": "Italy v Austria",
          "round": "semi-finals",
          "match": "Italy vs Austria",
          "score": "1x0",
          "winner": "Italy",
          "children": [
            {
              "name": "Germany v Sweden",
              "round": "quarter-finals",
              "match": "Germany vs Sweden",
              "score": "2x1",
              "winner": "Germany",
              "children": [
                {
                  "name": "Italy v United States",
                  "round": "round-of-16",
                  "match": "Italy vs United States",
                  "score": "7x1",
                  "winner": "Italy",
                  "children": []
                },
                {
                  "name": "Spain v Brazil",
                  "round": "round-of-16",
                  "match": "Spain vs Brazil",
                  "score": "3x1",
                  "winner": "Spain",
                  "children": []
                }
              ]
            },
            {
              "name": "Italy v Spain",
              "round": "quarter-finals",
              "match": "Italy vs Spain",
              "score": "1x1",
              "winner": "draw",
              "children": [
                {
                  "name": "Sweden v Argentina",
                  "round": "round-of-16",
                  "match": "Sweden vs Argentina",
                  "score": "3x2",
                  "winner": "Sweden",
                  "children": []
                },
                {
                  "name": "Switzerland v Netherlands",
                  "round": "round-of-16",
                  "match": "Switzerland vs Netherlands",
                  "score": "3x2",
                  "winner": "Switzerland",
                  "children": []
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "name": "1938 World Cup",
      "round": "world-cup",
      "match": "Italy vs Hungary",
      "score": "4x2",
      "winner": "Italy",
      "children": [
        {
          "name": "Hungary v Sweden",
          "round": "semi-finals",
          "match": "Hungary vs Sweden",
          "score": "5x1",
          "winner": "Hungary",
          "children": [
            {
              "name": "Brazil v Czechoslovakia",
              "round": "quarter-finals",
              "match": "Brazil vs Czechoslovakia",
              "score": "1x1",
              "winner": "draw",
              "children": [
                {
                  "name": "Switzerland v Germany",
                  "round": "round-of-16",
                  "match": "Switzerland vs Germany",
                  "score": "1x1",
                  "winner": "draw",
                  "children": []
                },
                {
                  "name": "Cuba v Romania",
                  "round": "round-of-16",
                  "match": "Cuba vs Romania",
                  "score": "3x3",
                  "winner": "draw",
                  "children": []
                }
              ]
            },
            {
              "name": "Hungary v Switzerland",
              "round": "quarter-finals",
              "match": "Hungary vs Switzerland",
              "score": "2x0",
              "winner": "Hungary",
              "children": [
                {
                  "name": "France v Belgium",
                  "round": "round-of-16",
                  "match": "France vs Belgium",
                  "score": "3x1",
                  "winner": "France",
                  "children": []
                },
                {
                  "name": "Hungary v Dutch East Indies",
                  "round": "round-of-16",
                  "match": "Hungary vs Dutch East Indies",
                  "score": "6x0",
                  "winner": "Hungary",
                  "children": []
                }
              ]
            }
          ]
        },
        {
          "name": "Italy v Brazil",
          "round": "semi-finals",
          "match": "Italy vs Brazil",
          "score": "2x1",
          "winner": "Italy",
          "children": [
            {
              "name": "Italy v France",
              "round": "quarter-finals",
              "match": "Italy vs France",
              "score": "3x1",
              "winner": "Italy",
              "children": [
                {
                  "name": "Italy v Norway",
                  "round": "round-of-16",
                  "match": "Italy vs Norway",
                  "score": "2x1",
                  "winner": "Italy",
                  "children": []
                },
                {
                  "name": "Brazil v Poland",
                  "round": "round-of-16",
                  "match": "Brazil vs Poland",
                  "score": "6x5",
                  "winner": "Brazil",
                  "children": []
                }
              ]
            },
            {
              "name": "Sweden v Cuba",
              "round": "quarter-finals",
              "match": "Sweden vs Cuba",
              "score": "8x0",
              "winner": "Sweden",
              "children": [
                {
                  "name": "Czechoslovakia v Netherlands",
                  "round": "round-of-16",
                  "match": "Czechoslovakia vs Netherlands",
                  "score": "3x0",
                  "winner": "Czechoslovakia",
                  "children": []
                },
                {
                  "name": "Cuba v Romania",
                  "round": "round-of-16",
                  "match": "Cuba vs Romania",
                  "score": "2x1",
                  "winner": "Cuba",
                  "children": []
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "name": "1954 World Cup",
      "round": "world-cup",
      "match": "West Germany vs Hungary",
      "score": "3x2",
      "winner": "West Germany",
      "children": [
        {
          "name": "Hungary v Uruguay",
          "round": "semi-finals",
          "match": "Hungary vs Uruguay",
          "score": "4x2",
          "winner": "Hungary",
          "children": [
            {
              "name": "Austria v Switzerland",
              "round": "quarter-finals",
              "match": "Austria vs Switzerland",
              "score": "7x5",
              "winner": "Austria",
              "children": []
            },
            {
              "name": "Uruguay v England",
              "round": "quarter-finals",
              "match": "Uruguay vs England",
              "score": "4x2",
              "winner": "Uruguay",
              "children": []
            }
          ]
        },
        {
          "name": "West Germany v Austria",
          "round": "semi-finals",
          "match": "West Germany vs Austria",
          "score": "6x1",
          "winner": "West Germany",
          "children": [
            {
              "name": "Hungary v Brazil",
              "round": "quarter-finals",
              "match": "Hungary vs Brazil",
              "score": "4x2",
              "winner": "Hungary",
              "children": []
            },
            {
              "name": "West Germany v Yugoslavia",
              "round": "quarter-finals",
              "match": "West Germany vs Yugoslavia",
              "score": "2x0",
              "winner": "West Germany",
              "children": []
            }
          ]
        }
      ]
    },
    {
      "name": "1958 World Cup",
      "round": "world-cup",
      "match": "Brazil vs Sweden",
      "score": "5x2",
      "winner": "Brazil",
      "children": [
        {
          "name": "Brazil v France",
          "round": "semi-finals",
          "match": "Brazil vs France",
          "score": "5x2",
          "winner": "Brazil",
          "children": [
            {
              "name": "Brazil v Wales",
              "round": "quarter-finals",
              "match": "Brazil vs Wales",
              "score": "1x0",
              "winner": "Brazil",
              "children": []
            },
            {
              "name": "France v Northern Ireland",
              "round": "quarter-finals",
              "match": "France vs Northern Ireland",
              "score": "4x0",
              "winner": "France",
              "children": []
            }
          ]
        },
        {
          "name": "Sweden v West Germany",
          "round": "semi-finals",
          "match": "Sweden vs West Germany",
          "score": "3x1",
          "winner": "Sweden",
          "children": [
            {
              "name": "Sweden v Soviet Union",
              "round": "quarter-finals",
              "match": "Sweden vs Soviet Union",
              "score": "2x0",
              "winner": "Sweden",
              "children": []
            },
            {
              "name": "West Germany v Yugoslavia",
              "round": "quarter-finals",
              "match": "West Germany vs Yugoslavia",
              "score": "1x0",
              "winner": "West Germany",
              "children": []
            }
          ]
        }
      ]
    },
    {
      "name": "1962 World Cup",
      "round": "world-cup",
      "match": "Brazil vs Czechoslovakia",
      "score": "3x1",
      "winner": "Brazil",
      "children": [
        {
          "name": "Brazil v Chile",
          "round": "semi-finals",
          "match": "Brazil vs Chile",
          "score": "4x2",
          "winner": "Brazil",
          "children": [
            {
              "name": "Brazil v England",
              "round": "quarter-finals",
              "match": "Brazil vs England",
              "score": "3x1",
              "winner": "Brazil",
              "children": []
            },
            {
              "name": "Chile v Soviet Union",
              "round": "quarter-finals",
              "match": "Chile vs Soviet Union",
              "score": "2x1",
              "winner": "Chile",
              "children": []
            }
          ]
        },
        {
          "name": "Czechoslovakia v Yugoslavia",
          "round": "semi-finals",
          "match": "Czechoslovakia vs Yugoslavia",
          "score": "3x1",
          "winner": "Czechoslovakia",
          "children": [
            {
              "name": "Czechoslovakia v Hungary",
              "round": "quarter-finals",
              "match": "Czechoslovakia vs Hungary",
              "score": "1x0",
              "winner": "Czechoslovakia",
              "children": []
            },
            {
              "name": "Yugoslavia v West Germany",
              "round": "quarter-finals",
              "match": "Yugoslavia vs West Germany",
              "score": "1x0",
              "winner": "Yugoslavia",
              "children": []
            }
          ]
        }
      ]
    },
    {
      "name": "1966 World Cup",
      "round": "world-cup",
      "match": "England vs West Germany",
      "score": "4x2",
      "winner": "England",
      "children": [
        {
          "name": "West Germany v Soviet Union",
          "round": "semi-finals",
          "match": "West Germany vs Soviet Union",
          "score": "2x1",
          "winner": "West Germany",
          "children": [
            {
              "name": "England v Argentina",
              "round": "quarter-finals",
              "match": "England vs Argentina",
              "score": "1x0",
              "winner": "England",
              "children": []
            },
            {
              "name": "Portugal v North Korea",
              "round": "quarter-finals",
              "match": "Portugal vs North Korea",
              "score": "5x3",
              "winner": "Portugal",
              "children": []
            }
          ]
        },
        {
          "name": "England v Portugal",
          "round": "semi-finals",
          "match": "England vs Portugal",
          "score": "2x1",
          "winner": "England",
          "children": [
            {
              "name": "Soviet Union v Hungary",
              "round": "quarter-finals",
              "match": "Soviet Union vs Hungary",
              "score": "2x1",
              "winner": "Soviet Union",
              "children": []
            },
            {
              "name": "West Germany v Uruguay",
              "round": "quarter-finals",
              "match": "West Germany vs Uruguay",
              "score": "4x0",
              "winner": "West Germany",
              "children": []
            }
          ]
        }
      ]
    },
    {
      "name": "1970 World Cup",
      "round": "world-cup",
      "match": "Brazil vs Italy",
      "score": "4x1",
      "winner": "Brazil",
      "children": [
        {
          "name": "Brazil v Uruguay",
          "round": "semi-finals",
          "match": "Brazil vs Uruguay",
          "score": "3x1",
          "winner": "Brazil",
          "children": [
            {
              "name": "Brazil v Peru",
              "round": "quarter-finals",
              "match": "Brazil vs Peru",
              "score": "4x2",
              "winner": "Brazil",
              "children": []
            },
            {
              "name": "Italy v Mexico",
              "round": "quarter-finals",
              "match": "Italy vs Mexico",
              "score": "4x1",
              "winner": "Italy",
              "children": []
            }
          ]
        },
        {
          "name": "Italy v West Germany",
          "round": "semi-finals",
          "match": "Italy vs West Germany",
          "score": "4x3",
          "winner": "Italy",
          "children": [
            {
              "name": "Soviet Union v Uruguay",
              "round": "quarter-finals",
              "match": "Soviet Union vs Uruguay",
              "score": "0x1",
              "winner": "away team win",
              "children": []
            },
            {
              "name": "West Germany v England",
              "round": "quarter-finals",
              "match": "West Germany vs England",
              "score": "3x2",
              "winner": "West Germany",
              "children": []
            }
          ]
        }
      ]
    },
    {
      "name": "1974 World Cup",
      "round": "world-cup",
      "match": "Netherlands vs West Germany",
      "score": "1x2",
      "winner": "away team win",
      "children": []
    },
    {
      "name": "1978 World Cup",
      "round": "world-cup",
      "match": "Argentina vs Netherlands",
      "score": "3x1",
      "winner": "Argentina",
      "children": []
    },
    {
      "name": "1982 World Cup",
      "round": "world-cup",
      "match": "Italy vs West Germany",
      "score": "3x1",
      "winner": "Italy",
      "children": [
        {
          "name": "Poland v Italy",
          "round": "semi-finals",
          "match": "Poland vs Italy",
          "score": "0x2",
          "winner": "away team win",
          "children": []
        },
        {
          "name": "West Germany v France",
          "round": "semi-finals",
          "match": "West Germany vs France",
          "score": "3x3",
          "winner": "draw",
          "children": []
        }
      ]
    },
    {
      "name": "1986 World Cup",
      "round": "world-cup",
      "match": "Argentina vs West Germany",
      "score": "3x2",
      "winner": "Argentina",
      "children": [
        {
          "name": "France v West Germany",
          "round": "semi-finals",
          "match": "France vs West Germany",
          "score": "0x2",
          "winner": "away team win",
          "children": [
            {
              "name": "Brazil v France",
              "round": "quarter-finals",
              "match": "Brazil vs France",
              "score": "1x1",
              "winner": "away team win",
              "children": [
                {
                  "name": "Mexico v Bulgaria",
                  "round": "round-of-16",
                  "match": "Mexico vs Bulgaria",
                  "score": "2x0",
                  "winner": "Mexico",
                  "children": []
                },
                {
                  "name": "Soviet Union v Belgium",
                  "round": "round-of-16",
                  "match": "Soviet Union vs Belgium",
                  "score": "3x4",
                  "winner": "away team win",
                  "children": []
                }
              ]
            },
            {
              "name": "West Germany v Mexico",
              "round": "quarter-finals",
              "match": "West Germany vs Mexico",
              "score": "0x0",
              "winner": "draw",
              "children": [
                {
                  "name": "Brazil v Poland",
                  "round": "round-of-16",
                  "match": "Brazil vs Poland",
                  "score": "4x0",
                  "winner": "Brazil",
                  "children": []
                },
                {
                  "name": "Argentina v Uruguay",
                  "round": "round-of-16",
                  "match": "Argentina vs Uruguay",
                  "score": "1x0",
                  "winner": "Argentina",
                  "children": []
                }
              ]
            }
          ]
        },
        {
          "name": "Argentina v Belgium",
          "round": "semi-finals",
          "match": "Argentina vs Belgium",
          "score": "2x0",
          "winner": "Argentina",
          "children": [
            {
              "name": "Argentina v England",
              "round": "quarter-finals",
              "match": "Argentina vs England",
              "score": "2x1",
              "winner": "Argentina",
              "children": [
                {
                  "name": "Italy v France",
                  "round": "round-of-16",
                  "match": "Italy vs France",
                  "score": "0x2",
                  "winner": "away team win",
                  "children": []
                },
                {
                  "name": "Morocco v West Germany",
                  "round": "round-of-16",
                  "match": "Morocco vs West Germany",
                  "score": "0x1",
                  "winner": "away team win",
                  "children": []
                }
              ]
            },
            {
              "name": "Spain v Belgium",
              "round": "quarter-finals",
              "match": "Spain vs Belgium",
              "score": "1x1",
              "winner": "away team win",
              "children": [
                {
                  "name": "England v Paraguay",
                  "round": "round-of-16",
                  "match": "England vs Paraguay",
                  "score": "3x0",
                  "winner": "England",
                  "children": []
                },
                {
                  "name": "Denmark v Spain",
                  "round": "round-of-16",
                  "match": "Denmark vs Spain",
                  "score": "1x5",
                  "winner": "away team win",
                  "children": []
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "name": "1990 World Cup",
      "round": "world-cup",
      "match": "West Germany vs Argentina",
      "score": "1x0",
      "winner": "West Germany",
      "children": [
        {
          "name": "Argentina v Italy",
          "round": "semi-finals",
          "match": "Argentina vs Italy",
          "score": "1x1",
          "winner": "draw",
          "children": [
            {
              "name": "Argentina v Yugoslavia",
              "round": "quarter-finals",
              "match": "Argentina vs Yugoslavia",
              "score": "0x0",
              "winner": "draw",
              "children": [
                {
                  "name": "Cameroon v Colombia",
                  "round": "round-of-16",
                  "match": "Cameroon vs Colombia",
                  "score": "2x1",
                  "winner": "Cameroon",
                  "children": []
                },
                {
                  "name": "Czechoslovakia v Costa Rica",
                  "round": "round-of-16",
                  "match": "Czechoslovakia vs Costa Rica",
                  "score": "4x1",
                  "winner": "Czechoslovakia",
                  "children": []
                }
              ]
            },
            {
              "name": "Republic of Ireland v Italy",
              "round": "quarter-finals",
              "match": "Republic of Ireland vs Italy",
              "score": "0x1",
              "winner": "away team win",
              "children": [
                {
                  "name": "Brazil v Argentina",
                  "round": "round-of-16",
                  "match": "Brazil vs Argentina",
                  "score": "0x1",
                  "winner": "away team win",
                  "children": []
                },
                {
                  "name": "West Germany v Netherlands",
                  "round": "round-of-16",
                  "match": "West Germany vs Netherlands",
                  "score": "2x1",
                  "winner": "West Germany",
                  "children": []
                }
              ]
            }
          ]
        },
        {
          "name": "West Germany v England",
          "round": "semi-finals",
          "match": "West Germany vs England",
          "score": "1x1",
          "winner": "draw",
          "children": [
            {
              "name": "Czechoslovakia v West Germany",
              "round": "quarter-finals",
              "match": "Czechoslovakia vs West Germany",
              "score": "0x1",
              "winner": "away team win",
              "children": [
                {
                  "name": "Republic of Ireland v Romania",
                  "round": "round-of-16",
                  "match": "Republic of Ireland vs Romania",
                  "score": "0x0",
                  "winner": "draw",
                  "children": []
                },
                {
                  "name": "Italy v Uruguay",
                  "round": "round-of-16",
                  "match": "Italy vs Uruguay",
                  "score": "2x0",
                  "winner": "Italy",
                  "children": []
                }
              ]
            },
            {
              "name": "Cameroon v England",
              "round": "quarter-finals",
              "match": "Cameroon vs England",
              "score": "2x3",
              "winner": "away team win",
              "children": [
                {
                  "name": "Spain v Yugoslavia",
                  "round": "round-of-16",
                  "match": "Spain vs Yugoslavia",
                  "score": "1x2",
                  "winner": "away team win",
                  "children": []
                },
                {
                  "name": "England v Belgium",
                  "round": "round-of-16",
                  "match": "England vs Belgium",
                  "score": "1x0",
                  "winner": "England",
                  "children": []
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "name": "1994 World Cup",
      "round": "world-cup",
      "match": "Brazil vs Italy",
      "score": "0x0",
      "winner": "draw",
      "children": [
        {
          "name": "Bulgaria v Italy",
          "round": "semi-finals",
          "match": "Bulgaria vs Italy",
          "score": "1x2",
          "winner": "away team win",
          "children": [
            {
              "name": "Italy v Spain",
              "round": "quarter-finals",
              "match": "Italy vs Spain",
              "score": "2x1",
              "winner": "Italy",
              "children": [
                {
                  "name": "Germany v Belgium",
                  "round": "round-of-16",
                  "match": "Germany vs Belgium",
                  "score": "3x2",
                  "winner": "Germany",
                  "children": []
                },
                {
                  "name": "Spain v Switzerland",
                  "round": "round-of-16",
                  "match": "Spain vs Switzerland",
                  "score": "3x0",
                  "winner": "Spain",
                  "children": []
                }
              ]
            },
            {
              "name": "Netherlands v Brazil",
              "round": "quarter-finals",
              "match": "Netherlands vs Brazil",
              "score": "2x3",
              "winner": "away team win",
              "children": [
                {
                  "name": "Saudi Arabia v Sweden",
                  "round": "round-of-16",
                  "match": "Saudi Arabia vs Sweden",
                  "score": "1x3",
                  "winner": "away team win",
                  "children": []
                },
                {
                  "name": "Romania v Argentina",
                  "round": "round-of-16",
                  "match": "Romania vs Argentina",
                  "score": "3x2",
                  "winner": "Romania",
                  "children": []
                }
              ]
            }
          ]
        },
        {
          "name": "Sweden v Brazil",
          "round": "semi-finals",
          "match": "Sweden vs Brazil",
          "score": "0x1",
          "winner": "away team win",
          "children": [
            {
              "name": "Bulgaria v Germany",
              "round": "quarter-finals",
              "match": "Bulgaria vs Germany",
              "score": "2x1",
              "winner": "Bulgaria",
              "children": [
                {
                  "name": "Netherlands v Republic of Ireland",
                  "round": "round-of-16",
                  "match": "Netherlands vs Republic of Ireland",
                  "score": "2x0",
                  "winner": "Netherlands",
                  "children": []
                },
                {
                  "name": "Brazil v United States",
                  "round": "round-of-16",
                  "match": "Brazil vs United States",
                  "score": "1x0",
                  "winner": "Brazil",
                  "children": []
                }
              ]
            },
            {
              "name": "Romania v Sweden",
              "round": "quarter-finals",
              "match": "Romania vs Sweden",
              "score": "2x2",
              "winner": "away team win",
              "children": [
                {
                  "name": "Nigeria v Italy",
                  "round": "round-of-16",
                  "match": "Nigeria vs Italy",
                  "score": "1x2",
                  "winner": "away team win",
                  "children": []
                },
                {
                  "name": "Mexico v Bulgaria",
                  "round": "round-of-16",
                  "match": "Mexico vs Bulgaria",
                  "score": "1x1",
                  "winner": "away team win",
                  "children": []
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "name": "1998 World Cup",
      "round": "world-cup",
      "match": "Brazil vs France",
      "score": "0x3",
      "winner": "away team win",
      "children": [
        {
          "name": "Brazil v Netherlands",
          "round": "semi-finals",
          "match": "Brazil vs Netherlands",
          "score": "1x1",
          "winner": "draw",
          "children": [
            {
              "name": "Italy v France",
              "round": "quarter-finals",
              "match": "Italy vs France",
              "score": "0x0",
              "winner": "away team win",
              "children": [
                {
                  "name": "Italy v Norway",
                  "round": "round-of-16",
                  "match": "Italy vs Norway",
                  "score": "1x0",
                  "winner": "Italy",
                  "children": []
                },
                {
                  "name": "Brazil v Chile",
                  "round": "round-of-16",
                  "match": "Brazil vs Chile",
                  "score": "4x1",
                  "winner": "Brazil",
                  "children": []
                }
              ]
            },
            {
              "name": "Brazil v Denmark",
              "round": "quarter-finals",
              "match": "Brazil vs Denmark",
              "score": "3x2",
              "winner": "Brazil",
              "children": [
                {
                  "name": "France v Paraguay",
                  "round": "round-of-16",
                  "match": "France vs Paraguay",
                  "score": "1x0",
                  "winner": "France",
                  "children": []
                },
                {
                  "name": "Nigeria v Denmark",
                  "round": "round-of-16",
                  "match": "Nigeria vs Denmark",
                  "score": "1x4",
                  "winner": "away team win",
                  "children": []
                }
              ]
            }
          ]
        },
        {
          "name": "France v Croatia",
          "round": "semi-finals",
          "match": "France vs Croatia",
          "score": "2x1",
          "winner": "France",
          "children": [
            {
              "name": "Netherlands v Argentina",
              "round": "quarter-finals",
              "match": "Netherlands vs Argentina",
              "score": "2x1",
              "winner": "Netherlands",
              "children": [
                {
                  "name": "Germany v Mexico",
                  "round": "round-of-16",
                  "match": "Germany vs Mexico",
                  "score": "2x1",
                  "winner": "Germany",
                  "children": []
                },
                {
                  "name": "Netherlands v Yugoslavia",
                  "round": "round-of-16",
                  "match": "Netherlands vs Yugoslavia",
                  "score": "2x1",
                  "winner": "Netherlands",
                  "children": []
                }
              ]
            },
            {
              "name": "Germany v Croatia",
              "round": "quarter-finals",
              "match": "Germany vs Croatia",
              "score": "0x3",
              "winner": "away team win",
              "children": [
                {
                  "name": "Romania v Croatia",
                  "round": "round-of-16",
                  "match": "Romania vs Croatia",
                  "score": "0x1",
                  "winner": "away team win",
                  "children": []
                },
                {
                  "name": "Argentina v England",
                  "round": "round-of-16",
                  "match": "Argentina vs England",
                  "score": "2x2",
                  "winner": "draw",
                  "children": []
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "name": "2002 World Cup",
      "round": "world-cup",
      "match": "Germany vs Brazil",
      "score": "0x2",
      "winner": "away team win",
      "children": [
        {
          "name": "Germany v South Korea",
          "round": "semi-finals",
          "match": "Germany vs South Korea",
          "score": "1x0",
          "winner": "Germany",
          "children": [
            {
              "name": "England v Brazil",
              "round": "quarter-finals",
              "match": "England vs Brazil",
              "score": "1x2",
              "winner": "away team win",
              "children": [
                {
                  "name": "Germany v Paraguay",
                  "round": "round-of-16",
                  "match": "Germany vs Paraguay",
                  "score": "1x0",
                  "winner": "Germany",
                  "children": []
                },
                {
                  "name": "Denmark v England",
                  "round": "round-of-16",
                  "match": "Denmark vs England",
                  "score": "0x3",
                  "winner": "away team win",
                  "children": []
                }
              ]
            },
            {
              "name": "Germany v United States",
              "round": "quarter-finals",
              "match": "Germany vs United States",
              "score": "1x0",
              "winner": "Germany",
              "children": [
                {
                  "name": "Sweden v Senegal",
                  "round": "round-of-16",
                  "match": "Sweden vs Senegal",
                  "score": "1x2",
                  "winner": "away team win",
                  "children": []
                },
                {
                  "name": "Spain v Republic of Ireland",
                  "round": "round-of-16",
                  "match": "Spain vs Republic of Ireland",
                  "score": "1x1",
                  "winner": "draw",
                  "children": []
                }
              ]
            }
          ]
        },
        {
          "name": "Brazil v Turkey",
          "round": "semi-finals",
          "match": "Brazil vs Turkey",
          "score": "1x0",
          "winner": "Brazil",
          "children": [
            {
              "name": "Spain v South Korea",
              "round": "quarter-finals",
              "match": "Spain vs South Korea",
              "score": "0x0",
              "winner": "away team win",
              "children": [
                {
                  "name": "Mexico v United States",
                  "round": "round-of-16",
                  "match": "Mexico vs United States",
                  "score": "0x2",
                  "winner": "away team win",
                  "children": []
                },
                {
                  "name": "Brazil v Belgium",
                  "round": "round-of-16",
                  "match": "Brazil vs Belgium",
                  "score": "2x0",
                  "winner": "Brazil",
                  "children": []
                }
              ]
            },
            {
              "name": "Senegal v Turkey",
              "round": "quarter-finals",
              "match": "Senegal vs Turkey",
              "score": "0x1",
              "winner": "away team win",
              "children": [
                {
                  "name": "Japan v Turkey",
                  "round": "round-of-16",
                  "match": "Japan vs Turkey",
                  "score": "0x1",
                  "winner": "away team win",
                  "children": []
                },
                {
                  "name": "South Korea v Italy",
                  "round": "round-of-16",
                  "match": "South Korea vs Italy",
                  "score": "2x1",
                  "winner": "South Korea",
                  "children": []
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "name": "2006 World Cup",
      "round": "world-cup",
      "match": "Italy vs France",
      "score": "1x1",
      "winner": "draw",
      "children": [
        {
          "name": "Germany v Italy",
          "round": "semi-finals",
          "match": "Germany vs Italy",
          "score": "0x2",
          "winner": "away team win",
          "children": [
            {
              "name": "Germany v Argentina",
              "round": "quarter-finals",
              "match": "Germany vs Argentina",
              "score": "1x1",
              "winner": "draw",
              "children": [
                {
                  "name": "Germany v Sweden",
                  "round": "round-of-16",
                  "match": "Germany vs Sweden",
                  "score": "2x0",
                  "winner": "Germany",
                  "children": []
                },
                {
                  "name": "Argentina v Mexico",
                  "round": "round-of-16",
                  "match": "Argentina vs Mexico",
                  "score": "2x1",
                  "winner": "Argentina",
                  "children": []
                }
              ]
            },
            {
              "name": "Italy v Ukraine",
              "round": "quarter-finals",
              "match": "Italy vs Ukraine",
              "score": "3x0",
              "winner": "Italy",
              "children": [
                {
                  "name": "England v Ecuador",
                  "round": "round-of-16",
                  "match": "England vs Ecuador",
                  "score": "1x0",
                  "winner": "England",
                  "children": []
                },
                {
                  "name": "Portugal v Netherlands",
                  "round": "round-of-16",
                  "match": "Portugal vs Netherlands",
                  "score": "1x0",
                  "winner": "Portugal",
                  "children": []
                }
              ]
            }
          ]
        },
        {
          "name": "Portugal v France",
          "round": "semi-finals",
          "match": "Portugal vs France",
          "score": "0x1",
          "winner": "away team win",
          "children": [
            {
              "name": "England v Portugal",
              "round": "quarter-finals",
              "match": "England vs Portugal",
              "score": "0x0",
              "winner": "away team win",
              "children": [
                {
                  "name": "Italy v Australia",
                  "round": "round-of-16",
                  "match": "Italy vs Australia",
                  "score": "1x0",
                  "winner": "Italy",
                  "children": []
                },
                {
                  "name": "Switzerland v Ukraine",
                  "round": "round-of-16",
                  "match": "Switzerland vs Ukraine",
                  "score": "0x0",
                  "winner": "away team win",
                  "children": []
                }
              ]
            },
            {
              "name": "Brazil v France",
              "round": "quarter-finals",
              "match": "Brazil vs France",
              "score": "0x1",
              "winner": "away team win",
              "children": [
                {
                  "name": "Brazil v Ghana",
                  "round": "round-of-16",
                  "match": "Brazil vs Ghana",
                  "score": "3x0",
                  "winner": "Brazil",
                  "children": []
                },
                {
                  "name": "Spain v France",
                  "round": "round-of-16",
                  "match": "Spain vs France",
                  "score": "1x3",
                  "winner": "away team win",
                  "children": []
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "name": "2010 World Cup",
      "round": "world-cup",
      "match": "Netherlands vs Spain",
      "score": "0x1",
      "winner": "away team win",
      "children": [
        {
          "name": "Uruguay v Netherlands",
          "round": "semi-finals",
          "match": "Uruguay vs Netherlands",
          "score": "2x3",
          "winner": "away team win",
          "children": [
            {
              "name": "Netherlands v Brazil",
              "round": "quarter-finals",
              "match": "Netherlands vs Brazil",
              "score": "2x1",
              "winner": "Netherlands",
              "children": [
                {
                  "name": "Uruguay v South Korea",
                  "round": "round-of-16",
                  "match": "Uruguay vs South Korea",
                  "score": "2x1",
                  "winner": "Uruguay",
                  "children": []
                },
                {
                  "name": "United States v Ghana",
                  "round": "round-of-16",
                  "match": "United States vs Ghana",
                  "score": "1x2",
                  "winner": "away team win",
                  "children": []
                }
              ]
            },
            {
              "name": "Uruguay v Ghana",
              "round": "quarter-finals",
              "match": "Uruguay vs Ghana",
              "score": "1x1",
              "winner": "draw",
              "children": [
                {
                  "name": "Germany v England",
                  "round": "round-of-16",
                  "match": "Germany vs England",
                  "score": "4x1",
                  "winner": "Germany",
                  "children": []
                },
                {
                  "name": "Argentina v Mexico",
                  "round": "round-of-16",
                  "match": "Argentina vs Mexico",
                  "score": "3x1",
                  "winner": "Argentina",
                  "children": []
                }
              ]
            }
          ]
        },
        {
          "name": "Germany v Spain",
          "round": "semi-finals",
          "match": "Germany vs Spain",
          "score": "0x1",
          "winner": "away team win",
          "children": [
            {
              "name": "Argentina v Germany",
              "round": "quarter-finals",
              "match": "Argentina vs Germany",
              "score": "0x4",
              "winner": "away team win",
              "children": [
                {
                  "name": "Netherlands v Slovakia",
                  "round": "round-of-16",
                  "match": "Netherlands vs Slovakia",
                  "score": "2x1",
                  "winner": "Netherlands",
                  "children": []
                },
                {
                  "name": "Brazil v Chile",
                  "round": "round-of-16",
                  "match": "Brazil vs Chile",
                  "score": "3x0",
                  "winner": "Brazil",
                  "children": []
                }
              ]
            },
            {
              "name": "Paraguay v Spain",
              "round": "quarter-finals",
              "match": "Paraguay vs Spain",
              "score": "0x1",
              "winner": "away team win",
              "children": [
                {
                  "name": "Paraguay v Japan",
                  "round": "round-of-16",
                  "match": "Paraguay vs Japan",
                  "score": "0x0",
                  "winner": "draw",
                  "children": []
                },
                {
                  "name": "Spain v Portugal",
                  "round": "round-of-16",
                  "match": "Spain vs Portugal",
                  "score": "1x0",
                  "winner": "Spain",
                  "children": []
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "name": "2014 World Cup",
      "round": "world-cup",
      "match": "Germany vs Argentina",
      "score": "1x0",
      "winner": "Germany",
      "children": [
        {
          "name": "Brazil v Germany",
          "round": "semi-finals",
          "match": "Brazil vs Germany",
          "score": "1x7",
          "winner": "away team win",
          "children": [
            {
              "name": "France v Germany",
              "round": "quarter-finals",
              "match": "France vs Germany",
              "score": "0x1",
              "winner": "away team win",
              "children": [
                {
                  "name": "Brazil v Chile",
                  "round": "round-of-16",
                  "match": "Brazil vs Chile",
                  "score": "1x1",
                  "winner": "draw",
                  "children": []
                },
                {
                  "name": "Colombia v Uruguay",
                  "round": "round-of-16",
                  "match": "Colombia vs Uruguay",
                  "score": "2x0",
                  "winner": "Colombia",
                  "children": []
                }
              ]
            },
            {
              "name": "Brazil v Colombia",
              "round": "quarter-finals",
              "match": "Brazil vs Colombia",
              "score": "2x1",
              "winner": "Brazil",
              "children": [
                {
                  "name": "Netherlands v Mexico",
                  "round": "round-of-16",
                  "match": "Netherlands vs Mexico",
                  "score": "2x1",
                  "winner": "Netherlands",
                  "children": []
                },
                {
                  "name": "Costa Rica v Greece",
                  "round": "round-of-16",
                  "match": "Costa Rica vs Greece",
                  "score": "1x1",
                  "winner": "draw",
                  "children": []
                }
              ]
            }
          ]
        },
        {
          "name": "Netherlands v Argentina",
          "round": "semi-finals",
          "match": "Netherlands vs Argentina",
          "score": "0x0",
          "winner": "away team win",
          "children": [
            {
              "name": "Argentina v Belgium",
              "round": "quarter-finals",
              "match": "Argentina vs Belgium",
              "score": "1x0",
              "winner": "Argentina",
              "children": [
                {
                  "name": "France v Nigeria",
                  "round": "round-of-16",
                  "match": "France vs Nigeria",
                  "score": "2x0",
                  "winner": "France",
                  "children": []
                },
                {
                  "name": "Germany v Algeria",
                  "round": "round-of-16",
                  "match": "Germany vs Algeria",
                  "score": "2x1",
                  "winner": "Germany",
                  "children": []
                }
              ]
            },
            {
              "name": "Netherlands v Costa Rica",
              "round": "quarter-finals",
              "match": "Netherlands vs Costa Rica",
              "score": "0x0",
              "winner": "draw",
              "children": [
                {
                  "name": "Argentina v Switzerland",
                  "round": "round-of-16",
                  "match": "Argentina vs Switzerland",
                  "score": "1x0",
                  "winner": "Argentina",
                  "children": []
                },
                {
                  "name": "Belgium v United States",
                  "round": "round-of-16",
                  "match": "Belgium vs United States",
                  "score": "2x1",
                  "winner": "Belgium",
                  "children": []
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "name": "2018 World Cup",
      "round": "world-cup",
      "match": "France vs Croatia",
      "score": "4x2",
      "winner": "France",
      "children": [
        {
          "name": "France v Belgium",
          "round": "semi-finals",
          "match": "France vs Belgium",
          "score": "1x0",
          "winner": "France",
          "children": [
            {
              "name": "Uruguay v France",
              "round": "quarter-finals",
              "match": "Uruguay vs France",
              "score": "0x2",
              "winner": "away team win",
              "children": [
                {
                  "name": "France v Argentina",
                  "round": "round-of-16",
                  "match": "France vs Argentina",
                  "score": "4x3",
                  "winner": "France",
                  "children": []
                },
                {
                  "name": "Uruguay v Portugal",
                  "round": "round-of-16",
                  "match": "Uruguay vs Portugal",
                  "score": "2x1",
                  "winner": "Uruguay",
                  "children": []
                }
              ]
            },
            {
              "name": "Brazil v Belgium",
              "round": "quarter-finals",
              "match": "Brazil vs Belgium",
              "score": "1x2",
              "winner": "away team win",
              "children": [
                {
                  "name": "Spain v Russia",
                  "round": "round-of-16",
                  "match": "Spain vs Russia",
                  "score": "1x1",
                  "winner": "away team win",
                  "children": []
                },
                {
                  "name": "Croatia v Denmark",
                  "round": "round-of-16",
                  "match": "Croatia vs Denmark",
                  "score": "1x1",
                  "winner": "draw",
                  "children": []
                }
              ]
            }
          ]
        },
        {
          "name": "Croatia v England",
          "round": "semi-finals",
          "match": "Croatia vs England",
          "score": "2x1",
          "winner": "Croatia",
          "children": [
            {
              "name": "Sweden v England",
              "round": "quarter-finals",
              "match": "Sweden vs England",
              "score": "0x2",
              "winner": "away team win",
              "children": [
                {
                  "name": "Brazil v Mexico",
                  "round": "round-of-16",
                  "match": "Brazil vs Mexico",
                  "score": "2x0",
                  "winner": "Brazil",
                  "children": []
                },
                {
                  "name": "Belgium v Japan",
                  "round": "round-of-16",
                  "match": "Belgium vs Japan",
                  "score": "3x2",
                  "winner": "Belgium",
                  "children": []
                }
              ]
            },
            {
              "name": "Russia v Croatia",
              "round": "quarter-finals",
              "match": "Russia vs Croatia",
              "score": "2x2",
              "winner": "away team win",
              "children": [
                {
                  "name": "Sweden v Switzerland",
                  "round": "round-of-16",
                  "match": "Sweden vs Switzerland",
                  "score": "1x0",
                  "winner": "Sweden",
                  "children": []
                },
                {
                  "name": "Colombia v England",
                  "round": "round-of-16",
                  "match": "Colombia vs England",
                  "score": "1x1",
                  "winner": "away team win",
                  "children": []
                }
              ]
            }
          ]
        }
      ]
    },
    {
      "name": "2022 World Cup",
      "round": "world-cup",
      "match": "Argentina vs France",
      "score": "3x3",
      "winner": "draw",
      "children": [
        {
          "name": "Argentina v Croatia",
          "round": "semi-finals",
          "match": "Argentina vs Croatia",
          "score": "3x0",
          "winner": "Argentina",
          "children": [
            {
              "name": "Croatia v Brazil",
              "round": "quarter-finals",
              "match": "Croatia vs Brazil",
              "score": "1x1",
              "winner": "draw",
              "children": [
                {
                  "name": "Netherlands v United States",
                  "round": "round-of-16",
                  "match": "Netherlands vs United States",
                  "score": "3x1",
                  "winner": "Netherlands",
                  "children": []
                },
                {
                  "name": "Argentina v Australia",
                  "round": "round-of-16",
                  "match": "Argentina vs Australia",
                  "score": "2x1",
                  "winner": "Argentina",
                  "children": []
                }
              ]
            },
            {
              "name": "Netherlands v Argentina",
              "round": "quarter-finals",
              "match": "Netherlands vs Argentina",
              "score": "2x2",
              "winner": "away team win",
              "children": [
                {
                  "name": "France v Poland",
                  "round": "round-of-16",
                  "match": "France vs Poland",
                  "score": "3x1",
                  "winner": "France",
                  "children": []
                },
                {
                  "name": "England v Senegal",
                  "round": "round-of-16",
                  "match": "England vs Senegal",
                  "score": "3x0",
                  "winner": "England",
                  "children": []
                }
              ]
            }
          ]
        },
        {
          "name": "France v Morocco",
          "round": "semi-finals",
          "match": "France vs Morocco",
          "score": "2x0",
          "winner": "France",
          "children": [
            {
              "name": "Morocco v Portugal",
              "round": "quarter-finals",
              "match": "Morocco vs Portugal",
              "score": "1x0",
              "winner": "Morocco",
              "children": [
                {
                  "name": "Japan v Croatia",
                  "round": "round-of-16",
                  "match": "Japan vs Croatia",
                  "score": "1x1",
                  "winner": "away team win",
                  "children": []
                },
                {
                  "name": "Brazil v South Korea",
                  "round": "round-of-16",
                  "match": "Brazil vs South Korea",
                  "score": "4x1",
                  "winner": "Brazil",
                  "children": []
                }
              ]
            },
            {
              "name": "England v France",
              "round": "quarter-finals",
              "match": "England vs France",
              "score": "1x2",
              "winner": "away team win",
              "children": [
                {
                  "name": "Morocco v Spain",
                  "round": "round-of-16",
                  "match": "Morocco vs Spain",
                  "score": "0x0",
                  "winner": "draw",
                  "children": []
                },
                {
                  "name": "Portugal v Switzerland",
                  "round": "round-of-16",
                  "match": "Portugal vs Switzerland",
                  "score": "6x1",
                  "winner": "Portugal",
                  "children": []
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}`
)


  return wrldCup//treeData;
}

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const { width, height } = dimensions;
    const margin = { top: 80, right: 80, bottom: 80, left: 80 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    svg.attr('width', width).attr('height', height);

    // Transform World Cup data to complete elimination phase tree
    const treeData = createCompleteEliminationTree(worldCup2022Data);

    // Ajuste para garantir que a árvore seja exibida corretamente dentro do SVG
    const cx = width / 2/2; // Centro X
    const cy = height / 2/2; // Centro Y
    const maxRadius = Math.min(width, height) * 0.35; // Reduzido para evitar cortes

    // Criação do layout radial
    const tree = d3.tree()
      .size([2 * Math.PI, maxRadius])
      .separation((a, b) => (a.parent == b.parent ? 1 : 2) / a.depth);

    // Transforma os dados em hierarquia e aplica o layout
    const root = tree(d3.hierarchy(treeData).sort((a, b) => d3.ascending(a.data.name, b.data.name)));

    // Ajusta as dimensões do SVG para garantir que toda a árvore seja exibida
    svg.attr('width', width).attr('height', height).attr('viewBox', [-cx, -cy, width, height]);

    // Cria o grupo principal para o layout radial
    const g = svg.append('g').attr('transform', `translate(${cx},${cy})`);

    // Color scheme
    const colors = {
      background: '#0a0a0a',
      text: '#ffffff',
      accent: '#4ade80',
      winner: '#fbbf24',
      finalist: '#94a3b8',
      line: '#00f2ffff',
      box: '#1f2937'
    };

    // Add title
    // Adiciona títulos fora da área da árvore radial
    svg.append('text')
      .attr('x', cx)
      .attr('y', -cy + 30)
      .attr('text-anchor', 'middle')
      .style('font-size', '24px')
      .style('font-weight', 'bold')
      .style('fill', colors.text)
      .text('2022 FIFA World Cup');

    svg.append('text')
      .attr('x', cx)
      .attr('y', -cy + 60)
      .attr('text-anchor', 'middle')
      .style('font-size', '14px')
      .style('fill', '#888')
      .text('Radial Elimination Phase Tree');

    // Create links for radial layout
    const link = g.append('g')
      .attr('fill', 'none')
      .attr('stroke', colors.line)
      .attr('stroke-opacity', 0.6)
      .attr('stroke-width', 1.5)
      .selectAll()
      .data(root.links())
      .join('path')
      .attr('d', d3.linkRadial()
        .angle(d => d.x)
        .radius(d => d.y));

    // Create nodes for radial layout
    const node = g.append('g')
      .selectAll()
      .data(root.descendants())
      .join('g')
      .attr('transform', d => `rotate(${d.x * 180 / Math.PI - 90}) translate(${d.y},0)`);

    // Add circles for nodes
    node.append('circle')
      .attr('fill', d => {
        if (d.data.round === "world-cup") return colors.winner;
        if (d.data.round === "semi-finals") return colors.finalist;
        return d.children ? colors.accent : '#999';
      })
      .attr('r', 1.5);

    // Add match names (labels for radial layout)
    // node.append('text')
    //   .attr('transform', d => `rotate(${d.x >= Math.PI ? 180 : 0})`)
    //   .attr('dy', '0.31em')
    //   .attr('x', d => d.x < Math.PI === !d.children ? 6 : -6)
    //   .attr('text-anchor', d => d.x < Math.PI === !d.children ? 'start' : 'end')
    //   .style('font-size', '5px')
    //   .style('font-weight', d => d.data.round === "Final" ? 'bold' : 'normal')
    //   .style('fill', colors.text)
    //   .text(d => d.data.name || d.data.match);

    // Add score details (smaller text)
    node.append('text')
      .attr('transform', d => `rotate(${d.x >= Math.PI ? 180 : 0})`)
      .attr('dy', '1.3em')
      .attr('x', d => d.x < Math.PI === !d.children ? 6 : -6)
      .attr('text-anchor', d => d.x < Math.PI === !d.children ? 'start' : 'end')
      .style('font-size', '4px')
      .style('fill', colors.accent)
      .text(d => d.data.score || '');

    // Add round labels (smaller and closer to nodes)
    node.append('text')
      .attr('dy', '-0.9em')
      .attr('x', 0)
      .attr('text-anchor', 'middle')
      .style('font-size', '8px')
      .style('fill', '#f8f3f3ff')
      .style('font-style', 'italic')
      .text(d => d.data.winner || '');

    // Add champion crown for the final match
    const championNode = node.filter(d => d.data.round === "world-cup");
    championNode.append('text')
      .attr('dy', '-1.5em')
      .attr('x', 0)
      .attr('text-anchor', 'middle')
      .style('font-size', '16px')
      .text('👑');

  }, [dimensions]);

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>← Back to Gallery</Text>
      </TouchableOpacity>
      <Text style={styles.title}>World Cup 2022</Text>
      <Text style={styles.subtitle}>Tournament Bracket Visualization</Text>
      {Platform.OS === 'web' && (
        <Text style={{color: '#666', fontSize: 12, position: 'absolute', bottom: 20}}>
          Press ESC to return to gallery
        </Text>
      )}
      <View style={styles.svgContainer}>
        <svg width={dimensions.width} height={dimensions.height} ref={svgRef}></svg>
        <Image
          style={styles.icon}
          source={require("./assets/StartScreen.jpg")}
          resizeMode="cover"
        />
      </View>
    </View>
  );
}
