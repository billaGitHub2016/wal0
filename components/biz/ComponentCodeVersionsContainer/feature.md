# Feature: Component Code Versions Container

As a developer
I want to view and switch between different versions of component code
So that I can track and manage the evolution of my component implementations

## Background

Given that I am working with a component that has multiple versions
And each version has associated prompts (text or images)
And I need to visualize the version history

## Scenario 1: Displaying Version History

Given that the component has multiple versions
When the component is rendered
Then I should see a vertical timeline of version dots on the left
And each dot should represent a unique version
And the dots should be arranged in chronological order
And the active version dot should be highlighted and enlarged

## Scenario 2: Version Tooltips

Given that I am viewing the version timeline
When I hover over a version dot
Then a tooltip should appear
And the tooltip should display the version's associated prompts
And the prompts can be either text or images
And the tooltip should appear on the right side of the dot

## Scenario 3: Switching Between Versions

Given that I am viewing the version timeline
When I click on a version dot
Then the active version should change to the selected version
And the selected version dot should become highlighted and enlarged
And the onVersionChange callback should be triggered with the new version ID
And the main content area should update to reflect the selected version

## Scenario 4: Active Version Content Display

Given that a version is currently active
When viewing the main content area
Then I should see a header with the version's prompts
And the prompts should be displayed with appropriate icons
And the main content should be displayed below the header
And the content area should have a distinctive border and background

## Scenario 5: Version Timeline Navigation

Given that there are multiple versions
When the active version changes
Then the timeline should automatically adjust
And the active version dot should be centered vertically
And the transition should be smooth with animation
And other version dots should maintain their relative positions

## Technical Acceptance Criteria

- The component must accept versions array with {id, prompt[]} structure
- The component must handle both text and image type prompts
- The component must provide smooth animations for version transitions
- The component must be responsive and work in both light and dark themes
- The component must maintain accessibility standards with proper ARIA attributes
- The timeline must automatically center the active version dot
