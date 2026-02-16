import { genId } from './helpers';

const DEFAULT_STRUCTURED_SECTION = {
  goal: '',
  progress: '',
  workingItems: [
    { id: genId(), text: '', progress: '', winsLosses: [{ id: genId(), text: '', type: 'win' }] },
  ],
  problemItems: [
    { id: genId(), text: '', solutions: [{ id: genId(), text: '' }] },
  ],
};

export const DEFAULT_3CS = {
  loveSchool: JSON.parse(JSON.stringify(DEFAULT_STRUCTURED_SECTION)),
  learn2x: JSON.parse(JSON.stringify(DEFAULT_STRUCTURED_SECTION)),
  lifeSkills: JSON.parse(JSON.stringify(DEFAULT_STRUCTURED_SECTION)),
};

export const DEFAULT_COACHING_POINTS = [
  {
    id: genId(),
    goal: '',
    cycleStart: '',
    cycleEnd: '',
    status: 'active',
    tasks: [{ id: genId(), text: '', done: false }],
    progress: '',
    feedback: '',
  },
];

export const DEFAULT_FEEDBACK = [
  {
    id: 'fb1',
    topic: '',
    entries: [{ id: genId(), text: '', createdAt: new Date().toISOString() }],
    notes: [{ id: genId(), text: '', createdAt: new Date().toISOString() }],
    createdAt: new Date().toISOString(),
  },
];
