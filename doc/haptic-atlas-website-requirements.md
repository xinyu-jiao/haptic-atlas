# Haptic Atlas Website Requirements Document v1

## 1. Project Overview

### Project Name
Haptic Atlas

### Project Type
Project website / vertical slice presentation website

### Purpose
Haptic Atlas is a web-based presentation, documentation, and evidence platform for a haptic navigation training system.

The website is not just a portfolio page. It should function as the main presentation layer of the project and support:

- project presentation
- vertical slice storytelling
- session documentation
- walking trace visualization
- testing archive
- data visualization
- iteration tracking
- code / GitHub access

### Current Role of the Website
At this stage, the website replaces the need for a standalone mobile companion app.

Real-time haptic control is handled separately through the physical hardware system and controller.

The website should now serve as:

- the main presentation layer
- the documentation layer
- the evidence layer
- the archive layer

---

## 2. Main Goals

The website should:

1. Clearly explain the Haptic Atlas project
2. Present the vertical slice for Milestone 2
3. Show how the hardware system, controller, and web platform work together
4. Record and display testing sessions
5. Visualize walking traces on a map
6. Archive iteration and development progress
7. Leave room for future data, media, and final review content

---

## 3. Platform and Scope

### Platform
- Responsive website
- Mobile-friendly and desktop-friendly
- English language

### In Scope for v1
- website structure and navigation
- placeholder-friendly content system
- project overview
- system components section
- session setup / logging section
- walk trace map section
- session results section
- history / archive section
- data visualization placeholders
- iteration archive
- code / GitHub section
- final review missing-parts section

### Out of Scope for v1
- login / user accounts
- full backend database
- real-time hardware control through website
- advanced analytics
- complex admin panel
- production-scale mapping infrastructure

---

## 4. Visual Direction

### Style Reference
The website should visually reference the current Haptic Atlas interface language and existing UI mockups.

### Desired Style Qualities
- dark background
- retro / pixel-inspired aesthetic
- pink / purple / black color palette
- game-like interface language
- clean section-based layout
- polished but still experimental
- visually cohesive with the current interface designs

### Tone
The website should feel:
- playful but serious
- speculative but functional
- accessible but not generic
- like a designed system, not a standard portfolio template

---

## 5. Primary Audience

The website is mainly for:

- instructors
- critics
- classmates
- reviewers
- collaborators
- future testers

Secondarily, it can also serve as:
- a documentation archive
- a process record
- a future portfolio artifact

---

## 6. Website Structure

The website should include the following main sections.

### 6.1 Home / Landing
**Purpose**
- introduce the project
- establish the visual identity
- explain what the site is

**Content**
- project title
- short project summary
- one key sentence about the vertical slice
- hero image / mockup / hardware image
- entry point into the full website

---

### 6.2 Project Overview
**Purpose**
- explain the project clearly and concisely

**Content**
- what Haptic Atlas is
- why non-visual navigation matters
- what problem the project addresses
- who the project is for
- how this vertical slice fits into the larger capstone

---

### 6.3 System Components
**Purpose**
- explain the full project system and how different parts work together

**Content**
- wearable haptic belt
- handheld controller
- website as documentation / evidence layer
- system diagram or visual explanation

This section should make clear that:
- hardware handles haptic output
- controller handles real-time directional input
- website handles setup, documentation, archive, and visualization

---

### 6.4 Vertical Slice
**Purpose**
- clearly define what is included in Milestone 2

**Content**
- what specific slice is being shown
- what is functioning now
- what is still incomplete
- why this slice represents the larger final project

This section should emphasize:
- end-to-end workflow
- representative quality
- integration of visual, technical, and conceptual systems

---

### 6.5 Session Setup
**Purpose**
- provide a web-based setup / logging area for sessions

**Content**
- level
- role
- environment
- distance
- participant name or ID
- notes

This section can begin as a visual / form-based placeholder and be filled manually later.

**Required fields for MVP**
- level
- role
- environment
- distance
- notes

---

### 6.6 Walk Trace / Session Map
**Purpose**
- display walking paths and route traces during testing sessions

**Content**
- map container
- start / stop tracking controls
- current route polyline
- start marker
- end marker
- session time
- accuracy or location status
- placeholder state if no data is available yet

**Important note**
This section is for session visualization and documentation, not precise navigation control.

For v1, it is acceptable to:
- use a placeholder map
- show static sample traces
- leave empty states ready for future data

---

### 6.7 Session Results
**Purpose**
- show the summary of a completed training session

**Content**
- level
- role
- duration
- corrections
- help count
- completion status
- notes
- optional image / trace preview

For v1, these can be:
- manual inputs
- static placeholders
- mock values for layout testing

---

### 6.8 History / Archive
**Purpose**
- store and display previous sessions

**Content**
- list of past sessions
- grouped by date if possible
- each entry may include:
  - level
  - duration
  - result summary
  - notes
  - trace thumbnail if available

For v1:
- this can be static or manually updated
- detail pages are optional

---

### 6.9 Data Visualization
**Purpose**
- visualize testing data and evidence over time

**Content**
- completion time charts
- correction count comparisons
- assistance / help comparisons
- testing summaries
- charts or tables

For v1:
- placeholder charts are acceptable
- real data can be added later

---

### 6.10 Iteration Process
**Purpose**
- show how the project has developed over time

**Content**
- hardware versions
- UI changes
- system architecture changes
- testing reflections
- what changed and why

This section should function as an iteration archive, not just a gallery.

---

### 6.11 Code / GitHub
**Purpose**
- provide technical transparency and access to the codebase

**Content**
- GitHub repository links
- short explanation of code structure
- web / hardware repo division if needed
- optional system diagram

This section should be concise.
It is meant to show technical grounding, not full documentation.

---

### 6.12 What’s Missing for Final Review
**Purpose**
- clearly state what is not complete yet but will be included later

**Content**
- additional levels or scenarios
- improved wearable form factor
- more testing data
- expanded visualization
- refined hardware/software integration

This section is important and should be explicit.

---

## 7. Functional Requirements

### 7.1 General Site Behavior
- website should be fully navigable on desktop and mobile
- sections should be readable even when some content is still missing
- placeholders should look intentional and designed
- site should support future expansion without redesigning the whole structure

### 7.2 Session Logging
For v1, session data may be:
- manually entered
- statically displayed
- stored locally if implemented

It is not required to have a full backend in v1.

### 7.3 Walk Trace
For v1, the map section may be implemented in one of these ways:
- static placeholder
- sample route image
- manually loaded route data
- live browser location tracking if feasible

### 7.4 Data Visualization
For v1, charts can be:
- static mockups
- placeholder components
- populated later with real testing data

---

## 8. Content Strategy

The website should support incomplete content gracefully.

This means:
- empty sections should still look intentional
- placeholder text can be used where data is not yet available
- cards, frames, and modules should be designed to be filled later
- the site should work as a scaffold first, then become richer over time

---

## 9. Technical Direction

### Recommended Front-End Direction
- React-based website
- modular section layout
- responsive design
- map component that can later support route tracking
- chart components that can later accept real data

### Recommended Initial Sections to Build First
1. Landing
2. Project Overview
3. System Components
4. Vertical Slice
5. Session Setup
6. Walk Trace placeholder
7. Session Results placeholder
8. History placeholder
9. Iteration Process
10. GitHub section
11. Missing for Final Review

---

## 10. MVP Priorities

### P0 - Must Have
- complete website structure
- visual identity aligned with the project
- landing section
- project overview
- system explanation
- vertical slice explanation
- placeholders for session, results, history, and map
- iteration archive section
- GitHub section
- final review missing-parts section

### P1 - Good to Have
- map component
- manual session entry form
- basic chart components
- archive cards with sample entries

### P2 - Later Expansion
- live tracking
- local or remote storage
- richer data visualization
- session detail pages
- media gallery
- deeper technical documentation

---

## 11. Notes for the Engineer / Designer

The priority of v1 is not to build every system in full.

The priority is to build a polished, structured, and expandable website that can:

- present the Haptic Atlas project clearly
- support the vertical slice presentation
- hold future session data
- hold future map traces
- hold future visual evidence
- communicate what exists now and what is still missing

The website should feel complete as a framework, even when some sections are still waiting for data.
