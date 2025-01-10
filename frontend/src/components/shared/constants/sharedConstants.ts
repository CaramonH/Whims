// This functions as a store for the color variables and the getRandomColor function,
//  the EVENT_TYPES, CARD_COLORS constants, and the CardData and GroupData interfaces.

// Color constants
export const CARD_COLORS = {
    TURQUOISE: "--color-turq",
    MINT: "--color-mant",
    APPLE_GREEN: "--color-apg",
    YELLOW: "--color-yell",
    ORANGE: "--color-org",
    RED: "--color-red",
    INDIGO: "--color-ind",
    PURPLE: "--color-purp"
  } as const;
  
  // Event type constants with their corresponding icons
  export const EVENT_TYPES = {
    FOOD: {
      value: 'food',
      icon: 'faUtensils',
      label: 'Food'
    },
    MUSIC: {
      value: 'music',
      icon: 'faMusic',
      label: 'Music'
    },
    MOVIE: {
      value: 'movie',
      icon: 'faFilm',
      label: 'Movie'
    },
    GAMES: {
      value: 'games',
      icon: 'faGamepad',
      label: 'Games'
    },
    TRAVEL: {
      value: 'travel',
      icon: 'faPlaneDeparture',
      label: 'Travel'
    },
    ART: {
      value: 'art',
      icon: 'faPalette',
      label: 'Art'
    }
  } as const;
  
  // this can be implemented in Card.tsx
  export const getRandomColor = (previousColor?: string): string => {
    const colors = Object.values(CARD_COLORS);
    let randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    while (previousColor && randomColor === previousColor) {
      randomColor = colors[Math.floor(Math.random() * colors.length)];
    }
    
    return randomColor;
  };