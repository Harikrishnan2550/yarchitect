export interface Project {
  id: string;
  title: string;
  category: string;
  location: string;
  year: string;
  image: string;
  gallery: string[];
  description: string;
  extendedDescription?: string;
  specs: {
    client: string;
    area: string;
    architect: string;
    status: string;
  };
}

export const projectsData: Project[] = [
  {
    id: "the-laterite-house",
    title: "The Laterite House",
    category: "Residential",
    location: "Malappuram, Kerala",
    year: "2023",
    image: "/img1.png",
    gallery: ["/hero.png", "/hero_sketch.png", "/wall.png"],
    description: "Rooted in the red clay soils of Malappuram, The Laterite House is a study in thermal mass and vernacular materiality. By exposing the raw brick texture of locally quarried laterite stones, the structure achieves an unforced connection with the terrain while cooling naturally in the sweltering tropical monsoons.",
    extendedDescription: "Laterite is a soil type rich in iron and aluminum, traditionally cut into building blocks in Kerala. We balanced this heavy, organic base with light steel columns and a floating timber canopy. The interior spaces revolve around a central double-height courtyard that acts as a thermal chimney, drawing hot air up and pushing cool air through deep timber louvers. Polished red oxide floors provide a cool tactile surface underfoot.",
    specs: {
      client: "Dr. Haris & Family",
      area: "4,200 sq.ft.",
      architect: "Ar. Shefin Yoosaf T",
      status: "Completed"
    }
  },
  {
    id: "monsoon-retreat",
    title: "Monsoon Retreat",
    category: "Hospitality",
    location: "Wayanad, Kerala",
    year: "2024",
    image: "/img5.png",
    gallery: ["/hero2.png", "/img4.png", "/hero5.png"],
    description: "Perched on a forested slope, Monsoon Retreat is designed to frame the drama of the Western Ghats monsoons. Built with a combination of structural steel and reclaimed teak wood, the resort floats above the ground to minimize footprint and allow natural groundwater flow.",
    extendedDescription: "Every guest villa features a private cantilevered deck that extends directly into the canopy, offering immersive views of the mist-laden valleys. Rainwater collection channels are explicitly exposed, turning storm runoff into a musical, visual element of the architecture as water flows into organic bio-retention ponds and natural streams.",
    specs: {
      client: "Vythiri Woods Resorts",
      area: "18,500 sq.ft.",
      architect: "Ar. Shefin Yoosaf T",
      status: "Completed"
    }
  },
  {
    id: "oasis-workspace",
    title: "Oasis Workspace",
    category: "Commercial",
    location: "Bangalore, Karnataka",
    year: "2022",
    image: "/img6.png",
    gallery: ["/hero6.png", "/img31.png", "/img4.png"],
    description: "A modern commercial workspace that prioritizes human well-being and visual green connections. Rejecting the glass-box office archetype, Oasis Workspace integrates indoor gardens, green walls, and deep shadow overhangs to decrease reliance on air conditioning.",
    extendedDescription: "Located in Bangalore's dense urban grid, the design utilizes a perforated concrete screen (jali) that filters the harsh southern light while allowing continuous ventilation. Micro-courtyards serve as informal breakout spaces, bringing workers into constant contact with natural flora and soothing water features.",
    specs: {
      client: "Zen Software Solutions",
      area: "22,000 sq.ft.",
      architect: "Ar. Shefin Yoosaf T",
      status: "Completed"
    }
  },
  {
    id: "vastu-courtyard",
    title: "Vastu Courtyard",
    category: "Residential",
    location: "Thrissur, Kerala",
    year: "2023",
    image: "/img7.png",
    gallery: ["/hero_new.png", "/img1.png", "/wall.png"],
    description: "A sensitive modernization of the traditional Kerala 'Nalukettu' layout. Designed around a sacred central courtyard, this residence reconciles ancient Vastu Shastra geometry with contemporary open-plan minimalism.",
    extendedDescription: "Double-height ceilings and collapsible glass partitions blur the boundary between the family living room and the central open courtyard. Exposed concrete finishes contrast with warm terracotta roof tiles, creating an architectural dialogue between modern industrial materials and traditional local crafts.",
    specs: {
      client: "Mr. & Mrs. Madhavan",
      area: "3,800 sq.ft.",
      architect: "Ar. Shefin Yoosaf T",
      status: "Completed"
    }
  },
  {
    id: "the-brass-pavilion",
    title: "The Brass Pavilion",
    category: "Cultural",
    location: "Trivandrum, Kerala",
    year: "2024",
    image: "/img9.png",
    gallery: ["/hero3.png", "/img5.png", "/hero2.png"],
    description: "A public gallery and exhibition pavilion designed around the historic metalworking traditions of Trivandrum. The structure is clad in hand-beaten brass panels that reflect the ambient sky and will oxidize over time into a deep olive-brown patina.",
    extendedDescription: "The pavilion features massive glass panels facing the public gardens, allowing art exhibitions to merge visually with local community life. The interior is characterized by raw polished concrete floors and custom metal screens that cast dramatic patterned shadows throughout the day.",
    specs: {
      client: "Kerala Arts & Heritage Society",
      area: "8,000 sq.ft.",
      architect: "Ar. Shefin Yoosaf T",
      status: "Completed"
    }
  },
  {
    id: "urban-canopy",
    title: "Urban Canopy",
    category: "Commercial",
    location: "Ernakulam, Kerala",
    year: "2023",
    image: "/img4.png",
    gallery: ["/hero2.png", "/img6.png", "/img5.png"],
    description: "A mixed-use development incorporating vertical gardens and deep-set terraces to combat the urban heat island effect of Ernakulam.",
    extendedDescription: "By utilizing stepped terraces and cascading vertical planting grids, the building creates a microclimate that reduces surrounding ambient temperatures. Deep overhangs protect the commercial storefronts from tropical downpours while providing shade for pedestrians.",
    specs: {
      client: "Apex Infra Group",
      area: "15,000 sq.ft.",
      architect: "Ar. Shefin Yoosaf T",
      status: "Completed"
    }
  }
];
