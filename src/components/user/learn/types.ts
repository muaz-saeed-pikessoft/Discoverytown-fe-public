export type LearnSection = 'core-academic' | 'test-prep' | 'enrichment'

export interface NavSectionItem {
  id: LearnSection
  label: string
}

export interface ColorSet {
  bg: string
  text: string
  border: string
  accent: string
}

export interface HeroPill {
  label: string
  bg: string
  text: string
  border: string
}

export interface WhyItem {
  image: string
  title: string
  desc: string
}

export interface TierItem {
  num: string
  name: string
  tag: string
  desc: string
  color: string
  bg: string
  border: string
}

export interface SubjectItem {
  name: string
  image: string
  desc: string
}

export interface CoreGroup {
  id: string
  label: string
  range: string
  image: string
  color: ColorSet
  desc: string
  subjects: SubjectItem[]
}

export interface TestItem {
  name: string
  image: string
  desc: string
  badge?: string
}

export interface TestPrepGroup {
  label: string
  image: string
  color: ColorSet
  tests: TestItem[]
}

export interface EnrichmentCourse {
  name: string
  image: string
  desc: string
}

export interface EnrichmentGroup {
  label: string
  image: string
  color: ColorSet
  courses: EnrichmentCourse[]
}

export interface EnrichmentCardProps {
  course: EnrichmentCourse
  colorSet: ColorSet
}

export interface SubjectCardProps {
  subject: SubjectItem
  colorSet: ColorSet
}

export interface TestPrepCardProps {
  test: TestItem
  colorSet: ColorSet
}

export interface TierCardProps {
  tier: TierItem
}

export interface WhyItemCardProps {
  item: WhyItem
}
