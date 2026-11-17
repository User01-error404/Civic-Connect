export const SEED_DATA = {
  config: {
    contacts: {
      headOffice: "Indira Gandhi Bhavan, Chhatrapati Shivaji Maharaj Road, Bhayandar (W), Thane 401101",
      phones: ["022-2819 2828", "022-2819 3028"],
      tollFree: "1800 224 849",
      pwdEmail: "pwd@mbmc.gov.in",
      website: "https://mbmc.gov.in",
      source: "mbmc.gov.in/en/contact-us",
      verifiedOn: "2026-11-18",
      note: "Verified official MBMC helpline numbers"
    },
    city: {
      name: "Mira-Bhayandar",
      areaSqKm: 79.4,
      electoralWards: 24,
      wardCommittees: 6,
      pincodes: {
        miraRoad: "401107",
        bhayandarWest: "401101",
        bhayandarEast: "401105"
      },
      centre: { lat: 19.29, lng: 72.85 },
      source: "mbmc.gov.in"
    }
  },
  wards: [
    {
      id: "ward01",
      no: 1,
      name: "Ward Committee 1",
      area: "Bhayandar (W): Maxus Mall, D-Mart and Uttan Road side",
      office: "Shubham Arcade, 2nd Floor, near Mira Hospital, D-Mart area, Bhayandar (W)",
      email: "ward01@mbmc.gov.in",
      centroid: { lat: 19.306, lng: 72.848 },
      source: "mbmc.gov.in/en/mbmc/ward-office-1"
    },
    {
      id: "ward02",
      no: 2,
      name: "Ward Committee 2",
      area: "Bhayandar (W): Nagar Bhavan, Mandvi Talav",
      office: "Dr. Babasaheb Ambedkar Bhavan (Nagar Bhavan), Mandvi Talav, Bhayandar (W)",
      email: "ward02@mbmc.gov.in",
      centroid: { lat: 19.301, lng: 72.848 },
      source: "mbmc.gov.in/en/mbmc/ward-office-2"
    },
    {
      id: "ward03",
      no: 3,
      name: "Ward Committee 3",
      area: "Bhayandar (E): Talav Road, B.P. Cross Road",
      office: "Khari Talav, B.P. Cross Road, Bhayandar (E)",
      email: "ward03@mbmc.gov.in",
      centroid: { lat: 19.3085, lng: 72.8595 },
      source: "mbmc.gov.in/en/mbmc/ward-offices"
    },
    {
      id: "ward04",
      no: 4,
      name: "Ward Committee 4",
      area: "Mira Road (E): Vimal Dairy Lane to Indralok, Goddev Naka to Phatak, Nayanagar",
      office: "Vilasrao Deshmukh Bhavan, Jangid Enclave, Kankia Road, Mira Road (E)",
      email: "ward04@mbmc.gov.in",
      centroid: { lat: 19.28, lng: 72.87 },
      source: "mbmc.gov.in/en/mbmc/ward-office-4"
    },
    {
      id: "ward05",
      no: 5,
      name: "Ward Committee 5",
      area: "Mira Road (E): GCC, Shanti Park, Silver Park",
      office: "Indira Gandhi Hospital building, Mira Road (E) (per 2022 MBMC notice)",
      email: "ward05@mbmc.gov.in",
      centroid: { lat: 19.279, lng: 72.869 },
      source: "mbmc.gov.in/assets/uploads/file-3612.pdf"
    },
    {
      id: "ward06",
      no: 6,
      name: "Ward Committee 6",
      area: "Kashimira, NH-8, Ghodbunder stretch",
      office: "Anna Bhau Sathe Bhavan, NH-8, behind Kashimira Police Station, Kashimira",
      email: "ward06@mbmc.gov.in",
      centroid: { lat: 19.27, lng: 72.879 },
      source: "mbmc.gov.in/en/mbmc/ward-office-6"
    }
  ],
  roadOwners: [
    {
      id: "mbmc",
      name: "MBMC Public Works Dept",
      shortName: "MBMC",
      type: "municipal",
      email: "pwd@mbmc.gov.in",
      note: "Municipal internal city roads, residential sectors and local street networks."
    },
    {
      id: "mmrda",
      name: "MMRDA (Metro Line 9 corridor)",
      shortName: "MMRDA",
      type: "authority",
      note: "Dahisar Check Naka to Bhayandar metro route; contractors repair damage along the corridor."
    },
    {
      id: "pwd_state",
      name: "Maharashtra State PWD",
      shortName: "State PWD",
      type: "state",
      note: "Ghodbunder Road from Hotel Fountain to Chene village highway corridor."
    },
    {
      id: "nhai",
      name: "NHAI",
      shortName: "NHAI",
      type: "national",
      note: "National Highway stretches across Thane border; inter-agency maintenance responsibility."
    }
  ],
  categories: [
    {
      id: "pothole",
      name: { en: "Pothole", hi: "गड्ढा", mr: "खड्डा" },
      icon: "alert-triangle",
      severity: 3
    },
    {
      id: "crack",
      name: { en: "Cracked road", hi: "दरार वाली सड़क", mr: "भेगा पडलेला रस्ता" },
      icon: "activity",
      severity: 2
    },
    {
      id: "water",
      name: { en: "Waterlogged road", hi: "जलभराव", mr: "पाणी साचलेला रस्ता" },
      icon: "droplet",
      severity: 2
    },
    {
      id: "foot",
      name: { en: "Broken footpath", hi: "टूटा फुटपाथ", mr: "तुटलेला फुटपाथ" },
      icon: "footprints",
      severity: 1
    },
    {
      id: "man",
      name: { en: "Open manhole", hi: "खुला मैनहोल", mr: "उघडे मॅनहोल" },
      icon: "shield-alert",
      severity: 3
    },
    {
      id: "div",
      name: { en: "Damaged divider", hi: "टूटा डिवाइडर", mr: "तुटलेला दुभाजक" },
      icon: "minus-circle",
      severity: 2
    }
  ],
  campaigns: [
    {
      id: "camp-mastic-2026w46",
      title: {
        en: "Mastic asphalt pothole repair drive",
        hi: "मास्टिक डामर गड्ढा मरम्मत अभियान",
        mr: "मास्टिक डांबर खड्डे दुरुस्ती मोहीम"
      },
      body: {
        en: "MBMC PWD mechanised mastic asphalt deployment for potholes, critical intersections and manhole surrounds.",
        hi: "एमबीएमसी पीडब्ल्यूडी द्वारा गड्ढों और प्रमुख चौराहों के लिए मशीनीकृत मास्टिक डामर तकनीक।",
        mr: "खड्डे आणि प्रमुख चौकांसाठी एमबीएमसी पीडब्ल्यूडीचे यांत्रिकीकृत मास्टिक डांबर तंत्रज्ञान."
      },
      type: "road_repair",
      wardIds: ["ward01", "ward02", "ward04"],
      progress: 74,
      targetText: "19 of 25 priority junctions",
      weekStart: "2026-11-16T00:00:00+05:30",
      status: "published"
    },
    {
      id: "camp-deepclean-w5",
      title: {
        en: "Deep Clean Drive, Ward Committee 5",
        hi: "डीप क्लीन ड्राइव, वार्ड समिति 5",
        mr: "डीप क्लीन ड्राइव, प्रभाग समिती 5"
      },
      body: {
        en: "Intensive cleanliness and storm-water drainage silt clearance across Shanti Park and GCC sectors.",
        hi: "शांति पार्क और जीसीसी सेक्टर में व्यापक सफाई और नाला गाद निकासी अभियान।",
        mr: "शांती पार्क आणि जीसीसी परिसरात सखोल स्वच्छता व नालेसफाई मोहीम."
      },
      type: "cleanliness",
      wardIds: ["ward05"],
      progress: 86,
      targetText: "8,500 of 10,000 kg debris cleared",
      weekStart: "2026-11-16T00:00:00+05:30",
      status: "published"
    },
    {
      id: "camp-concrete-roads",
      title: {
        en: "Road concretisation: priority arterial roads",
        hi: "सड़क कंक्रीटीकरण: प्राथमिक मुख्य सड़कें",
        mr: "रस्ते काँक्रीटीकरण: प्राधान्य मुख्य रस्ते"
      },
      body: {
        en: "Long-term conversion of heavily travelled asphalt roads to durable cement-concrete to eliminate recurring potholes.",
        hi: "बार-बार गड्ढे होने से रोकने के लिए डामर सड़कों को मजबूत सीमेंट कंक्रीट में बदलना।",
        mr: "वारंवार होणाऱ्या खड्ड्यांचा नायनाट करण्यासाठी डांबरी रस्त्यांचे सिमेंट काँक्रीटीकरण."
      },
      type: "road_repair",
      wardIds: ["ward03", "ward06"],
      progress: 62,
      targetText: "3.2 of 5.1 km paved",
      weekStart: "2026-11-16T00:00:00+05:30",
      status: "published"
    }
  ],
  complaints: [
    {
      id: "cc2026000108",
      ticketNo: "CC-2026-000108",
      reporterId: "seed-user",
      category: "road_damage",
      subcategory: "pothole",
      description: "Potholes have reopened on the repaired stretch; two-wheelers swerve dangerously into the fast lane during rush hours.",
      location: {
        geo: { lat: 19.2655, lng: 72.883 },
        address: "Ghodbunder Road near Kajupada, Kashimira",
        approx: true
      },
      wardId: "ward06",
      roadOwnerId: "pwd_state",
      departmentId: "pwd",
      status: "in_progress",
      severity: 3,
      priority: "high",
      upvoteCount: 57,
      createdAt: "2026-11-16T09:12:00+05:30",
      updatedAt: "2026-11-17T11:00:00+05:30",
      isSample: true,
      updates: [
        {
          id: "u1",
          type: "status",
          toStatus: "submitted",
          visibility: "public",
          actorRole: "Citizen Reporter",
          note: "Damage recorded with geo-coordinates.",
          createdAt: "2026-11-16T09:12:00+05:30"
        },
        {
          id: "u2",
          type: "status",
          fromStatus: "submitted",
          toStatus: "acknowledged",
          note: "Jurisdiction check completed. Forwarded to State PWD (road owner for Ghodbunder corridor).",
          visibility: "public",
          actorRole: "Ward Officer (Ward 6)",
          createdAt: "2026-11-16T14:30:00+05:30"
        },
        {
          id: "u3",
          type: "status",
          fromStatus: "acknowledged",
          toStatus: "in_progress",
          note: "Repair crew scheduled with quick-setting cold mix patch.",
          visibility: "public",
          actorRole: "Dept Admin (PWD State)",
          createdAt: "2026-11-17T11:00:00+05:30"
        }
      ]
    },
    {
      id: "cc2026000107",
      ticketNo: "CC-2026-000107",
      reporterId: "seed-user",
      category: "road_damage",
      subcategory: "man",
      description: "Broken manhole cover on the road near the school gate, marked only with a tree branch. High hazard for school buses.",
      location: {
        geo: { lat: 19.279, lng: 72.869 },
        address: "Near GCC International School, Mira Road (E)",
        approx: true
      },
      wardId: "ward05",
      roadOwnerId: "mbmc",
      departmentId: "pwd",
      status: "acknowledged",
      severity: 3,
      priority: "critical",
      upvoteCount: 33,
      createdAt: "2026-11-15T08:40:00+05:30",
      updatedAt: "2026-11-15T16:00:00+05:30",
      isSample: true,
      updates: [
        {
          id: "u1",
          type: "status",
          toStatus: "submitted",
          visibility: "public",
          actorRole: "Citizen Reporter",
          note: "Complaint submitted via mobile.",
          createdAt: "2026-11-15T08:40:00+05:30"
        },
        {
          id: "u2",
          type: "status",
          fromStatus: "submitted",
          toStatus: "acknowledged",
          note: "Inspected by Ward 5 staff. Caution barricades placed; replacement cover requisitioned from central store.",
          visibility: "public",
          actorRole: "Ward Officer (Ward 5)",
          createdAt: "2026-11-15T16:00:00+05:30"
        }
      ]
    },
    {
      id: "cc2026000106",
      ticketNo: "CC-2026-000106",
      reporterId: "seed-user",
      category: "road_damage",
      subcategory: "crack",
      description: "Surface cracking and uneven settlement along the metro corridor road caused by heavy machinery movement.",
      location: {
        geo: { lat: 19.2825, lng: 72.8665 },
        address: "Metro Line 9 corridor, Mira Road (E)",
        approx: true
      },
      wardId: "ward04",
      roadOwnerId: "mmrda",
      departmentId: "pwd",
      status: "submitted",
      severity: 2,
      priority: "medium",
      upvoteCount: 21,
      createdAt: "2026-11-17T18:05:00+05:30",
      updatedAt: "2026-11-17T18:05:00+05:30",
      isSample: true,
      updates: [
        {
          id: "u1",
          type: "status",
          toStatus: "submitted",
          visibility: "public",
          actorRole: "Citizen Reporter",
          note: "Report submitted. Routed to MMRDA liaison cell.",
          createdAt: "2026-11-17T18:05:00+05:30"
        }
      ]
    },
    {
      id: "cc2026000105",
      ticketNo: "CC-2026-000105",
      reporterId: "seed-user",
      category: "road_damage",
      subcategory: "pothole",
      description: "Deep pothole near the temple; buses and auto-rickshaws brake sharply to avoid bottoming out.",
      location: {
        geo: { lat: 19.305, lng: 72.835 },
        address: "Uttan Road, near Ram Mandir, Bhayandar (W)",
        approx: true
      },
      wardId: "ward01",
      roadOwnerId: "mbmc",
      departmentId: "pwd",
      status: "in_progress",
      severity: 3,
      priority: "high",
      upvoteCount: 46,
      createdAt: "2026-11-14T07:55:00+05:30",
      updatedAt: "2026-11-16T10:00:00+05:30",
      isSample: true,
      updates: [
        {
          id: "u1",
          type: "status",
          toStatus: "submitted",
          visibility: "public",
          actorRole: "Citizen Reporter",
          note: "Report registered.",
          createdAt: "2026-11-14T07:55:00+05:30"
        },
        {
          id: "u2",
          type: "status",
          fromStatus: "submitted",
          toStatus: "acknowledged",
          note: "MBMC Junior Engineer inspected site.",
          visibility: "public",
          actorRole: "Ward Officer (Ward 1)",
          createdAt: "2026-11-15T09:30:00+05:30"
        },
        {
          id: "u3",
          type: "status",
          fromStatus: "acknowledged",
          toStatus: "in_progress",
          note: "Work order issued under Mastic asphalt repair contract.",
          visibility: "public",
          actorRole: "MBMC PWD Admin",
          createdAt: "2026-11-16T10:00:00+05:30"
        }
      ]
    },
    {
      id: "cc2026000104",
      ticketNo: "CC-2026-000104",
      reporterId: "seed-user",
      category: "road_damage",
      subcategory: "water",
      description: "Water accumulates along the gutter line for hours after rain, concealing deep pothole edges from motorists.",
      location: {
        geo: { lat: 19.307, lng: 72.8495 },
        address: "Station Road, behind Maxus Mall, Bhayandar (W)",
        approx: true
      },
      wardId: "ward01",
      roadOwnerId: "mbmc",
      departmentId: "pwd",
      status: "acknowledged",
      severity: 2,
      priority: "medium",
      upvoteCount: 18,
      createdAt: "2026-11-13T19:20:00+05:30",
      updatedAt: "2026-11-14T09:00:00+05:30",
      isSample: true,
      updates: [
        {
          id: "u1",
          type: "status",
          toStatus: "submitted",
          visibility: "public",
          actorRole: "Citizen Reporter",
          note: "Report submitted with drainage photo.",
          createdAt: "2026-11-13T19:20:00+05:30"
        },
        {
          id: "u2",
          type: "status",
          fromStatus: "submitted",
          toStatus: "acknowledged",
          note: "Storm water drainage department notified to desilt connecting gully trap.",
          visibility: "public",
          actorRole: "Ward Officer (Ward 1)",
          createdAt: "2026-11-14T09:00:00+05:30"
        }
      ]
    },
    {
      id: "cc2026000103",
      ticketNo: "CC-2026-000103",
      reporterId: "seed-user",
      category: "road_damage",
      subcategory: "foot",
      description: "Footpath slabs fractured and wobbling; pedestrians forced onto the main traffic lane.",
      location: {
        geo: { lat: 19.3085, lng: 72.8595 },
        address: "Talav Road, Bhayandar (E)",
        approx: true
      },
      wardId: "ward03",
      roadOwnerId: "mbmc",
      departmentId: "pwd",
      status: "resolved",
      severity: 2,
      priority: "medium",
      upvoteCount: 12,
      createdAt: "2026-11-08T10:10:00+05:30",
      updatedAt: "2026-11-12T17:30:00+05:30",
      resolvedAt: "2026-11-12T17:30:00+05:30",
      isSample: true,
      updates: [
        {
          id: "u1",
          type: "status",
          toStatus: "submitted",
          visibility: "public",
          actorRole: "Citizen Reporter",
          note: "Footpath damage reported.",
          createdAt: "2026-11-08T10:10:00+05:30"
        },
        {
          id: "u2",
          type: "status",
          fromStatus: "submitted",
          toStatus: "in_progress",
          note: "Contractor mobilized precast paver blocks.",
          visibility: "public",
          actorRole: "Ward Officer (Ward 3)",
          createdAt: "2026-11-10T11:00:00+05:30"
        },
        {
          id: "u3",
          type: "status",
          fromStatus: "in_progress",
          toStatus: "resolved",
          note: "Precast slabs replaced, leveled, and grouted. Inspection verified by JE.",
          visibility: "public",
          actorRole: "Ward Officer (Ward 3)",
          createdAt: "2026-11-12T17:30:00+05:30"
        }
      ]
    },
    {
      id: "cc2026000102",
      ticketNo: "CC-2026-000102",
      reporterId: "seed-user",
      category: "road_damage",
      subcategory: "crack",
      description: "Long structural asphalt fissure across the road near the turning bend; widening after each rain.",
      location: {
        geo: { lat: 19.28, lng: 72.87 },
        address: "Kankia Road, Jangid Enclave, Mira Road (E)",
        approx: true
      },
      wardId: "ward04",
      roadOwnerId: "mbmc",
      departmentId: "pwd",
      status: "assigned",
      severity: 2,
      priority: "medium",
      upvoteCount: 9,
      createdAt: "2026-11-12T12:00:00+05:30",
      updatedAt: "2026-11-13T09:30:00+05:30",
      isSample: true,
      updates: [
        {
          id: "u1",
          type: "status",
          toStatus: "submitted",
          visibility: "public",
          actorRole: "Citizen Reporter",
          note: "Reported with photos.",
          createdAt: "2026-11-12T12:00:00+05:30"
        },
        {
          id: "u2",
          type: "status",
          fromStatus: "submitted",
          toStatus: "assigned",
          note: "Assigned to Ward 4 Maintenance Section for bitumen crack sealing.",
          visibility: "public",
          actorRole: "MBMC PWD Admin",
          createdAt: "2026-11-13T09:30:00+05:30"
        }
      ]
    },
    {
      id: "cc2026000101",
      ticketNo: "CC-2026-000101",
      reporterId: "seed-user",
      category: "road_damage",
      subcategory: "div",
      description: "Concrete road divider fractured at the median crossover; protruding steel rebars exposed to night traffic.",
      location: {
        geo: { lat: 19.301, lng: 72.848 },
        address: "Near Nagar Bhavan, Mandvi Talav, Bhayandar (W)",
        approx: true
      },
      wardId: "ward02",
      roadOwnerId: "mbmc",
      departmentId: "pwd",
      status: "resolved",
      severity: 1,
      priority: "low",
      upvoteCount: 6,
      createdAt: "2026-11-05T09:00:00+05:30",
      updatedAt: "2026-11-09T15:00:00+05:30",
      resolvedAt: "2026-11-09T15:00:00+05:30",
      isSample: true,
      updates: [
        {
          id: "u1",
          type: "status",
          toStatus: "submitted",
          visibility: "public",
          actorRole: "Citizen Reporter",
          note: "Report submitted.",
          createdAt: "2026-11-05T09:00:00+05:30"
        },
        {
          id: "u2",
          type: "status",
          fromStatus: "submitted",
          toStatus: "resolved",
          note: "Median re-concreted, painted with high-visibility reflective yellow stripes.",
          visibility: "public",
          actorRole: "Ward Officer (Ward 2)",
          createdAt: "2026-11-09T15:00:00+05:30"
        }
      ]
    }
  ]
};
