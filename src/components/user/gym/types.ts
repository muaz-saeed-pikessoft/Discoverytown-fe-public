export type GymSection = 'age-groups' | 'classes' | 'schedule' | 'special'

export interface NavSectionItem {
  id: GymSection
  label: string
}

export interface ColorSet {
  bg: string
  text: string
  border: string
  accent: string
}

export interface GymClass {
  name: string
  ages: string
  desc: string
  track?: string
  img?: string
}

export interface AgeGroup {
  id: string
  label: string
  range: string
  color: ColorSet
  focus: string
  note?: string
  img: string
  classes: GymClass[]
}

export interface ScheduleStudio {
  studio: string
  label: string
  tag: string
  tagColor: string
}

export interface ScheduleSlot {
  time: string
  studios: ScheduleStudio[]
  simultaneous?: boolean
}

export interface ScheduleDay {
  day: string
  label: string
  desc: string
  color: string
  slots: ScheduleSlot[]
}

export interface SpecialProgram {
  name: string
  desc: string
  badge: string
  badgeColor: string
  badgeBg: string
  border: string
  img: string
}

export interface AgeGroupPanelProps {
  group: AgeGroup
}

export interface AgeGroupTabsProps {
  groups: AgeGroup[]
  activeId: string
  onSelect: (id: string) => void
}

export interface AllClassesSectionProps {
  groups: AgeGroup[]
}

export interface ClassCardProps {
  gymClass: GymClass
  accent: string
  border: string
  bg: string
}

export interface ScheduleSectionProps {
  days: ScheduleDay[]
}

export interface SpecialProgramCardProps {
  program: SpecialProgram
}
