// Import the WebP images
import lukaA from "../assets/images/Luka-A.webp";
import lukaA1 from "../assets/images/Luka-A1.webp";
import lukaA2 from "../assets/images/Luka-A2.webp";
import lukaA3 from "../assets/images/Luka-A3.webp";
import lukaD from "../assets/images/Luka-D.webp";
import lukaD1 from "../assets/images/Luka-D1.webp";
import lukaD2 from "../assets/images/Luka-D2.webp";
import lukaF from "../assets/images/Luka-F.webp";
import lukaF1 from "../assets/images/Luka-F1.webp";
import lukaF2 from "../assets/images/Luka-F2.webp";
import lukaE from "../assets/images/Luka-E.webp";
import lukaE1 from "../assets/images/Luka-E1.webp";
import lukaE2 from "../assets/images/Luka-E2.webp";
import lukaE3 from "../assets/images/Luka-E3.webp";
import lukaG from "../assets/images/Luka-G.webp";
import lukaG1 from "../assets/images/Luka-G1.webp";
import lukaG2 from "../assets/images/Luka-G2.webp";
import lukaH from "../assets/images/Luka-H.webp";
import lukaH1 from "../assets/images/Luka-H1.webp";
import lukaH2 from "../assets/images/Luka-H2.webp";
import lukaI from "../assets/images/Luka-I.webp";
import lukaI1 from "../assets/images/Luka-I1.webp";
import lukaJ from "../assets/images/Luka-J.webp";
import lukaJ1 from "../assets/images/Luka-J1.webp";
import lukaK from "../assets/images/Luka-K.webp";
import lukaK1 from "../assets/images/Luka-K1.webp";
import lukaL from "../assets/images/Luka-L.webp";
import lukaL1 from "../assets/images/Luka-L1.webp";
import lukaL2 from "../assets/images/Luka-L2.webp";

// Placeholder image URLs for additional projects
const placeholderImages = {
    sportsCenter: [
        "https://images.unsplash.com/photo-1466611653911-95081537e5b7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1074&q=80",
        "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d",
        "https://images.unsplash.com/photo-1613665813446-82a78c468a1d",
    ],
    shoppingCenter: [
        "https://images.unsplash.com/photo-1548614606-52b4451f994b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1074&q=80",
        "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d",
        "https://images.unsplash.com/photo-1613665813446-82a78c468a1d",
    ],
    winery: [
        "https://images.unsplash.com/photo-1592833159155-c62df1b65634?ixlib=rb-1.2.1&auto=format&fit=crop&w=1074&q=80",
        "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d",
        "https://images.unsplash.com/photo-1613665813446-82a78c468a1d",
    ],
    warehouse: [
        "https://images.unsplash.com/photo-1497440001374-f26997328c1b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1074&q=80",
        "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d",
        "https://images.unsplash.com/photo-1613665813446-82a78c468a1d",
    ],
    officeBuilding: [
        "https://images.unsplash.com/photo-1553451191-1f1f13c1c0d9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1074&q=80",
        "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d",
        "https://images.unsplash.com/photo-1613665813446-82a78c468a1d",
    ],
    marina: [
        "https://images.unsplash.com/photo-1559302504-64aae6ca6b6f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1074&q=80",
        "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d",
        "https://images.unsplash.com/photo-1613665813446-82a78c468a1d",
    ],
};

// Export project images
export const projectImages = {
    countryHouse: [lukaG.src, lukaG1.src, lukaG2.src],
    carCanopy: [lukaH.src, lukaH1.src, lukaH2.src],
    countryHouseBuje: [lukaI.src, lukaI1.src],
    vilaInBale: [lukaJ.src, lukaJ1.src],
    houseMaliLosinj: [lukaK.src, lukaK1.src],
    familyHouseKrk: [lukaE.src, lukaE1.src, lukaE2.src, lukaE3.src],
    familyHouseZadar: [lukaL.src, lukaL1.src, lukaL2.src],
    // Additional project images
    sportsCenter: placeholderImages.sportsCenter,
    shoppingCenter: placeholderImages.shoppingCenter,
    winery: placeholderImages.winery,
    warehouse: placeholderImages.warehouse,
    officeBuilding: placeholderImages.officeBuilding,
    marina: placeholderImages.marina,
};

// Export project details
export const projectDetails = {
    countryHouse: {
        power: "5kW",
        panels: "20",
        savings: "85%",
        yearlyOutput: "6,800 kWh",
        completed: "2023",
    },
    carCanopy: {
        power: "9kW",
        panels: "36",
        savings: "90%",
        yearlyOutput: "12,240 kWh",
        completed: "2023",
    },
    countryHouseBuje: {
        power: "20kW",
        panels: "80",
        savings: "85%",
        yearlyOutput: "27,200 kWh",
        completed: "2022",
    },
    vilaInBale: {
        power: "8kW",
        panels: "32",
        savings: "80%",
        yearlyOutput: "10,880 kWh",
        completed: "2023",
    },
    houseMaliLosinj: {
        power: "9kW",
        panels: "36",
        savings: "85%",
        yearlyOutput: "12,240 kWh",
        completed: "2023",
    },
    familyHouseKrk: {
        power: "20kW",
        panels: "48",
        savings: "85%",
        yearlyOutput: "30,000 kWh",
        completed: "2022",
    },
    familyHouseZadar: {
        power: "5kW",
        panels: "20",
        savings: "85%",
        yearlyOutput: "6,800 kWh",
        completed: "2023",
    },
    // Additional project details
    sportsCenter: {
        power: "40kW",
        panels: "100",
        savings: "80%",
        yearlyOutput: "60,000 kWh",
        completed: "2023",
    },
    shoppingCenter: {
        power: "120kW",
        panels: "300",
        savings: "85%",
        yearlyOutput: "180,000 kWh",
        completed: "2024",
    },
    winery: {
        power: "35kW",
        panels: "88",
        savings: "75%",
        yearlyOutput: "52,500 kWh",
        completed: "2023",
    },
    warehouse: {
        power: "90kW",
        panels: "225",
        savings: "80%",
        yearlyOutput: "135,000 kWh",
        completed: "2024",
    },
    officeBuilding: {
        power: "45kW",
        panels: "113",
        savings: "85%",
        yearlyOutput: "67,500 kWh",
        completed: "2023",
    },
    marina: {
        power: "60kW",
        panels: "150",
        savings: "80%",
        yearlyOutput: "90,000 kWh",
        completed: "2024",
    },
}; 