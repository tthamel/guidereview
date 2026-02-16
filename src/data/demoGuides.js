export const DEMO_GUIDES = [
  {
    id: 'g1', name: 'Bryce Derry', group: 'L2', leadGuide: 'Samantha DePalo',
    coachingPoints: [
      { id: 'fp1', goal: 'Strengthen authentic relationships by focusing on day-to-day moments of genuine connection', cycleStart: '2026-03-02', cycleEnd: '2026-04-22', status: 'carried', tasks: [
        { id: 't1', text: 'Find common ground with Blair', done: false },
        { id: 't2', text: 'Use PBIS model with Jacob', done: false },
      ], progress: '50%', feedback: 'Talk less, listen more' },
    ],
    threeCs: {
      loveSchool: {
        goal: 'Establish 10x guide relationships with all students', progress: '50%',
        workingItems: [
          { id: 'w1', text: 'Help Jacob work off strike', progress: '10%', winsLosses: [{ id: 'wl1', text: 'Still major Alpha deficit', type: 'loss' }] },
          { id: 'w2', text: 'Find common ground with Blair', progress: '50%', winsLosses: [{ id: 'wl2', text: 'Felt heard after convo around common academic barriers', type: 'win' }] },
        ],
        problemItems: [
          { id: 'p1', text: 'Jacob has fewer privileges due to strike', solutions: [{ id: 's1', text: 'Rewards provided outside regular model' }] },
          { id: 'p2', text: "Blair said she doesn't love her guide in S2 survey", solutions: [{ id: 's2', text: 'New motivational model implemented' }] },
        ],
      },
      learn2x: {
        goal: 'All students 2x', progress: '50%',
        workingItems: [{ id: 'l2w1', text: 'Motivational model for Blair', progress: '50%', winsLosses: [
          { id: 'l2wl1', text: 'Met with Braden to get insights for GT kids', type: 'win' },
          { id: 'l2wl2', text: 'Still not closing >1 ring', type: 'loss' },
          { id: 'l2wl3', text: 'Only 5 days >120XP in S3', type: 'loss' },
        ] }],
        problemItems: [{ id: 'l2p1', text: 'Jacob unmotivated due to lower level of privilege', solutions: [{ id: 'l2s1', text: 'Offering rewards outside of regular campus motivational model' }] }],
      },
      lifeSkills: {
        goal: 'Tighten daily workshop plans', progress: '50%',
        workingItems: [
          { id: 'lsw1', text: "Club Commanders Guide's Guide", progress: '90%', winsLosses: [{ id: 'lswl1', text: 'Club launched!', type: 'win' }] },
          { id: 'lsw2', text: 'S4 workshop pitches', progress: '90%', winsLosses: [{ id: 'lswl2', text: 'Public speaking workshop pitch needs serious work', type: 'loss' }] },
        ],
        problemItems: [{ id: 'lsp1', text: 'Level struggling with teamwork', solutions: [{ id: 'lss1', text: 'Delivered improv workshop S3 to show them how to rely on one another' }] }],
      },
    },
    feedback: [{ id: 'fb1', topic: 'WUDs and DSs', entries: [{ id: 'fbe1', text: 'Need more help locating, navigating, organizing, and executing all WUDs and DSs each week', createdAt: '2026-02-10T14:00:00Z' }], notes: [], actionPlans: [], createdAt: '2026-02-10T14:00:00Z' }],
    sessions: [{ id: 's1a', date: '2026-02-10', notes: "Needs additional support with Blair's motivational model", summary: 'Set up meeting with Braden', createdBy: 'Samantha DePalo', createdAt: '2026-02-10T15:00:00Z', snapshot: null }],
    lastUpdated: '2026-02-15T12:00:00Z',
  },
  {
    id: 'g2', name: 'Kimberley Dillard', group: 'LL', leadGuide: 'Samantha DePalo',
    coachingPoints: [
      { id: 'fp2', goal: 'Coach all kids to set at least one ambitious goal and follow through on its progress', cycleStart: '2026-03-02', cycleEnd: '2026-04-22', status: 'active', tasks: [{ id: 't3', text: '', done: false }], progress: '10%', feedback: 'Use Limitless Meetings for this' },
    ],
    threeCs: {
      loveSchool: {
        goal: 'All kids prefer school over vacation', progress: '90%',
        workingItems: [{ id: 'w3', text: 'example', progress: '', winsLosses: [{ id: 'wl3', text: 'example', type: 'win' }] }],
        problemItems: [{ id: 'p3', text: "Kids can't always access campus-wide Launches", solutions: [{ id: 's3', text: 'Provide 1:1 support during Launch' }] }],
      },
      learn2x: {
        goal: 'All students on grade level', progress: '90%',
        workingItems: [{ id: 'l2w2', text: 'ROAR plan for Reed, London, and Evanna', progress: '50%', winsLosses: [
          { id: 'l2wl4', text: 'Reed and London now reading', type: 'win' },
          { id: 'l2wl5', text: 'London still below grade level', type: 'loss' },
        ] }],
        problemItems: [{ id: 'l2p2', text: 'Finding time for ROAR while still allowing adequate time for kids to get 120XP each day', solutions: [{ id: 'l2s2', text: 'Shortening ROAR sessions to fit within Core Skills without preventing kids from hitting 120XP' }] }],
      },
      lifeSkills: {
        goal: "Improve kids' independence to bring them up to grade level", progress: '50%',
        workingItems: [{ id: 'lsw3', text: 'Days of the week check chart item', progress: '90%', winsLosses: [{ id: 'lswl3', text: "London still can't remember Sunday", type: 'loss' }] }],
        problemItems: [{ id: 'lsp2', text: "Kids can't access 100% of Alpha programming due to lack of independence", solutions: [
          { id: 'lss2', text: 'Wonderlab check chart provided before LL check chart introduced' },
          { id: 'lss3', text: 'More time allotted to check chart' },
          { id: 'lss4', text: '75% of workshops independence focused' },
        ] }],
      },
    },
    feedback: [{ id: 'fb2', topic: 'Q Break support', entries: [{ id: 'fbe2', text: 'Want to use Q Breaks for individual support needs but need help with supervision for other students', createdAt: '2026-02-11T09:00:00Z' }], notes: [], actionPlans: [], createdAt: '2026-02-11T09:00:00Z' }],
    sessions: [{ id: 's1b', date: '2026-02-11', notes: "Can't find sufficient time to incorporate ROAR", summary: 'Split Townhall groups', createdBy: 'Samantha DePalo', createdAt: '2026-02-11T15:00:00Z', snapshot: null }],
    lastUpdated: '2026-02-15T12:00:00Z',
  },
  {
    id: 'g3', name: 'Jessica Staggs', group: 'L1', leadGuide: 'Samantha DePalo',
    coachingPoints: [
      { id: 'fp3', goal: 'Establish clear, proactive systems for Life Skills coaching and Test2Pass preparation across all workshops', cycleStart: '2026-03-02', cycleEnd: '2026-04-22', status: 'carried', tasks: [{ id: 't4', text: 'Complete Baseline & Checkpoints', done: false }], progress: '10%', feedback: 'See feedback on Workshop Pitch DS' },
    ],
    threeCs: {
      loveSchool: {
        goal: 'All kids prefer school over vacation', progress: '50%',
        workingItems: [{ id: 'w4', text: 'example', progress: '50%', winsLosses: [{ id: 'wl4', text: 'example', type: 'loss' }] }],
        problemItems: [
          { id: 'p4', text: 'example', solutions: [{ id: 's4', text: 'example' }] },
          { id: 'p5', text: 'example', solutions: [{ id: 's5', text: 'example' }] },
          { id: 'p6', text: 'example', solutions: [{ id: 's6', text: 'example' }] },
        ],
      },
      learn2x: {
        goal: 'All students above grade level', progress: '10%',
        workingItems: [{ id: 'l2w3', text: 'Positive self-talk tracker', progress: '50%', winsLosses: [
          { id: 'l2wl6', text: '80% progress for Evanna', type: 'win' },
          { id: 'l2wl7', text: '20% progress for Teddy', type: 'loss' },
        ] }],
        problemItems: [{ id: 'l2p3', text: 'Keaton still struggling with basic computer use', solutions: [{ id: 'l2s3', text: 'Prioritizing typing during check chart time' }] }],
      },
      lifeSkills: {
        goal: 'Own a workshop', progress: '10%',
        workingItems: [{ id: 'lsw4', text: 'S4 workshop pitches', progress: '50%', winsLosses: [{ id: 'lswl4', text: 'Two great ideas for workshops in progress', type: 'win' }] }],
        problemItems: [{ id: 'lsp3', text: 'T2P metrics for S3 chess workshop unclear', solutions: [{ id: 'lss5', text: 'Sought support from LG Sam for coaching, and from chess vendor to provide clearer metrics' }] }],
      },
    },
    feedback: [{ id: 'fb3', topic: '', entries: [{ id: 'fbe3', text: '', createdAt: new Date().toISOString() }], notes: [], actionPlans: [], createdAt: new Date().toISOString() }],
    sessions: [{ id: 's1c', date: '2026-02-12', notes: 'Struggling with T2P checkpoints for chess and 5K', summary: 'Discuss chess baselines with vendor; work with events team to finalize 5K logistics', createdBy: 'Samantha DePalo', createdAt: '2026-02-12T15:00:00Z', snapshot: null }],
    lastUpdated: '2026-02-15T12:00:00Z',
  },
];
