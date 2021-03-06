# CHANGELOG

## 8.0.7
### Changed
- Added border for all states of toggle control for visibility in high contrast mode

## 8.0.6
### Changed
- Added box-shadow to search bar to be accessible on light mastheads.

## 8.0.5
### Fixed
- When a FormField was rendered with no error, we were setting the FormError's title to `false`, causing a react warning.
- Updated node-sass to fix npm audit warnings.

## 8.0.4
### Changed
- Updated fields to pass in `aria-required={props.required}` to input

## 8.0.3
### Changed
- Update controls
- Made shell use the new link colors

### Fixed
- Loading indicators use accent color
- Normalized padding in text input across states to avoid jumpiness
- Updated colors on checkbox states to use correct accent shades

## 8.0.2
### Changed
- GalleryCard SolidBackground can no longer receive a color and has a primary and disabled flags to style it properly. To add a specific style you can still pass className.

## 8.0.1
### Changed
- Moved search input to use accent foreground color

### Fixed
- Added line height to masthead branding to not cut-out text

## 8.0.0
### Changed
- Updated CSS library with new color mapping
- Updated all controls to use new color mapping the appropriate way
- Removed StyledComponent

## 7.0.27
## Fixed
- Outline on toggle was hidden when the component didn't have any space to the left
- Outline on collapsed navigation didn't show correctly one side

## 7.0.26
### Fixed
- Fixed text color on dropdown for tooltip

## 7.0.25
### Changed
- Update NavItemHeight to align with office fabric command bar fluent update

### Fixed
- Add font family to text input cancel button to properly display it

## 7.0.24
### Fixed
- Changed `icon` prop in `ActionTrigger` to be of type `string | ReactNode`

## 7.0.23
### Fixed
- Added `instanceCount` to `DateField`/`DateTimeField`/`TextField` to ensure unique IDs

## 7.0.22
### Fixed
- Fixed date picker to update values only if necessary props changed

## 7.0.21
### Fixed
- Fixed padding/margin on toggle switch when toggle container has padding/margin

## 7.0.20
### Changed
- Added autofocus to button on flyout for a11y purposes

## 7.0.19
### Fixed
- Fixed height on logo for masthead

## 7.0.18
### Fixed
- Fixed dropdown container floating around blocking user interaction.

## 7.0.17
### Changed
- Use optional chaining when accessing `attr`

## 7.0.16
### Changed
- Removed unsafe methods from controls

### Fixed
- Fixed npm low vulnerabilities.
- Updated some components to use React.memo
- Added name property to balloon icon in form fields
- Fixed color of required mark on form fields
- Fixed focus indicator outline offset on default buttons
- Fixed toggle to have appropriate focus behavior
- Fixed info balloon on form fields to be announced by screen readers
- Added error indicator for screen readers to error icon in form field errors.

## 7.0.15
### Changed
- Changed `Thumbnail` to properly spread its `attr` property.

## 7.0.14
### Changed
- Updated hover sytle of RadioInput

## 7.0.13
### Changed
- Added conditional support for role="presentation" for thumbnails without alt text

## 7.0.12
### Changed
- Updated sytle of RadioInput.

## 7.0.11
### Changed
- Removed fill color from SVGs in Navigation.

## 7.0.10
### Changed
- Changed `selectRowCheckbox` in `GenericManagementListAttributes` to also be a function of a row.

## 7.0.9
### Changed
- Added data-test-hook='progressbar' for HorizontalLoader

## 7.0.8
### Fixed
- Flattened markdown in context panel to have content, footer and header at the same level.

## 7.0.7
### Changed
- Change `data-active` attribute to be a boolean attribute (i.e., emit \<foo data-active> instead of \<foo data-active="true">)
- Rename componentWillReceiveProps to [UNSAFE_componentWillReceiveProps](https://reactjs.org/blog/2018/03/27/update-on-async-rendering.html) to avoid deprecation warnings in React 16.11+
- Add deprecation warnings for Date components because they're not fully localized/accessible. We should use the [Office Fabric control](https://developer.microsoft.com/en-us/fabric/#/controls/web/datepicker) instead.
### Fixed
- Update handlebars version to fix vulnerability

## 7.0.6
### Changed
- Added data-test-active to active navigation item

## 7.0.5
### Fixed
- Fixed height of navigation scrollable container

## 7.0.4
### Fixed
- Fix display of HorizontalLoader under FormField

## 7.0.3
### Fixed
- Add overflow hidden to workspace container

## 7.0.2
### Fixed
- Made workspace to be a flex container without overflow specified

## 7.0.1
### Fixed
- Added role='main' and background color to shell workspace

## 7.0.0
- Adopted fluent styles

### Changed
- Added a NavigationItemContainer component to allow organizing sections with headers on the global navbar
- Adopted fluent CSS library based on CSS custom properties
- Added on blur handlers to text input elements

### Fixed
- Minor style fixes in multiple components
- Made balloon and dropdown aware of their position in the page and how to properly switch position and aligment based on it.
- Fixed RTL support for all components
- Added hideError capabilities to all FormField elements
- Accessibility requirements for form field errors.

## v6.3.5
### Changed
- Updated the global nav icon to be the hamburger icon and always have it aligned to the left.

## v6.3.4
### Fixed
- Fix DatePicker + DateTimeField to return empty string and set value to empty when the value is removed

## v6.3.3
### Fixed
- Fix alignment of items inside action trigger button and buttons.

## v6.3.2
### Fixed
- Fix styling on action trigger button right icon.

## v6.3.1
### Fixed
- Fix styling on icon alignment for buttons.

## v6.3.0
### Changed
 - Add the option to get a ContextPanel with or without the portal
 - Reduce padding between panel title and body

## v6.2.5
### Fixed
 - BUG 4640169: White Accent setting causing problem in all the checkbox
 - Fix hover styles for toggle input

## v6.2.4
### Changed
- Specified InlinePopup button type='button'

## v6.2.3
### Fixed
- Add the far side container of the form field label only if a far side item is present.
- Update styles of far side container of form field label.

## v6.2.2
### Added
- Added ability to include an extra node to the far side of the label in form fields.

## v6.2.1
### Fixed
- BUG 4445327: Masthead: hover color regression on action buttons

## v6.2.0
- Refactor component styling logic using ThemeProvider in styled component library.
- Enable styling on Toggle, Checkbox, Pivot & Masthead.

## v6.1.0
- Add logo to Masthead
- Update Masthead, ActionTriggerButton to support customized styles

## v6.0.8
### Fixed
- Updated ActionTrigger to have correct sizes so outline is not cutted when the element is focused and hover.

## v6.0.7
### Changed
 - Updated the user type in masthead to JSX.Element

## v6.0.6
### Fixed
- BUG 3858806: remove role for text input in DatePicker.

## v6.0.5
### Fixed
- BUG 3870819: [Select Input] Text in select field should not be cut off with browser zoom.

## v6.0.4
### Fixed
- Handling the error during the download of the thumbnail. Instead to show the broken images symbol, fallback to the default user-icon.

## v6.0.3
### Fixed
- Masthead user display name and email are now centered vertically.
- Shell now allows Masthead to use a different NavigationProperties than the one passed to the main navbar.

## v6.0.2
### Fixed
- Changed Checkbox and RadioInputs to be controlled components: pass the `checked` parameter instead of `defaultChecked` to fix issue when the checkbox state change did not reflect the new value. Also change the onChange handlers to return the new values from the incoming props instead of relying on the html element.
- Block search input onClick from propagating upwards - this fixes issue for mobile devices when clicking on the search input dismissed the element.

## v6.0.1
### Fixed
- The onchange handlers for Checkbox and RadioInputs stopped working in IoT Central; adding a dummy event handler to their parent `label` fixes the issue.

## v6.0.0
### Changed
- Masthead and Navigation are now part of Shell to ensure good responsive behavior. Pass the MastheadProperties and NavigationProperties to Shell instead of creating the components yourself. For an example of how to initialize Shell correctly, check the [baseline app.tsx](https://github.com/Azure/iot-ux-baseline/blob/master/src/pages/App.tsx).

## v5.2.2
## Fixed
- BUG 3217787: [Form Field] If the user tabs out of a field when the tooltip button is open (Alt+F1), close the tooltip.
- BUG 2383275: [Management List] Narrator should not read non-interactive column headers as Buttons.

## v5.2.1
## Changed
- Update font url

## v5.2.0
## Changed
- Fixed postinstall script. npm i was looking for it.
- Changed input background color on dark-theme to be transparent
- Removed unused icons
- Removed GalleryCard Component

## v5.1.1
## Changed
- Remove font files and point to files on the server
- Add icons.scss
- Update to 5.0.0 of "@microsoft/azure-iot-ux-fluent-css

## v5.0.1
## Changed
- Rename all component `.scss` files to `.module.scss` to align with [Create React App's convention for CSS modules](https://facebook.github.io/create-react-app/docs/adding-a-css-modules-stylesheet). This is a purely internal change and does not affect public consumption of the controls.

## v5.0.0
### Changed
- Dependency on a `_colors.scss` existing at the global scope (resolved via webpack `includePath`).

  The controls library now requires the file to exist at `<project root>/src/styles/_colors.scss`. This convention allows the library to be used with an out-of-the-box [create-react-app](https://github.com/facebook/create-react-app) install without ejecting. See the [Azure IoT UX Baseline](https://github.com/Azure/iot-ux-baseline) for an example.

  For ease of use, this file will be automatically created on postinstall if it doesn't already exist.


## v4.0.9
### Fixed
- Calendar component would choose current time first time you are selecting a date. Now defaults to 12:00 AM local
- fix off by one issue with date picker
- unit tests were not running
- removed unused dependencies
- updated max-width on buttons to be 100% of the parent width

## v4.0.8
### Fixed
- DateTimeField accepts empty string and renders placeholder.

## v4.0.7
### Fixed
- InlinePopup should be disableable

## v4.0.6
### Fixed
- remove cancel button when input is readonly

## v4.0.5
### Fixed
- hover background for alert close button was incorrect on all browsers except firefox

## v4.0.4
### Fixed
- add padding to fix select dropdown component where selected text overlaps with the icon

## v4.0.2
### Fixed
- fix crawling ant color for light and dark theme
- update documentation backgrounds for loaders

## v4.0.1
### Fixed
- remove publish restriction
- fix bugs url

## v4.0.0
### Changed
- move to @microsoft npm scope

## v3.0.4
### Fixed
- toggle controls need switch role for screen readers
- prevent default and stop propagation for tooltip keyboard shortcut in form field

## v3.0.3
### Fixed
- screen reader support for calendar
- take in props to override browser locale for calendar

## v3.0.2
### Fixed
- expose callback for clicking calendar icon in date picker. includes next visible state.
- blur handler for form field tooltip so it will close when focus leaves the field

## v3.0.1
### Fixed
- blur listener for datepicker was too greedy.
- shrink calendar
- move date picker window listers to component mounting events

## v3.0.0
### Changed
- calendar api changed. no longer extends drop down
### Fixed
- calendar in datepicker is now reachable via keyboard

## v2.0.5
### Fixed
- date picker should not open when input receives focus

## v2.0.4
### Fixed
- add outline for danger button
- upgrade fluent css version

## v2.0.3
### Fixed
- add outline for primary button
- upgrade fluent css version

## v2.0.2
migrating to private package registry and changing package scope.
update references to fluent css

## v2.0.1
### Fixed
- alert close button hover colors didn't work across themes. updated to newer version of fluent-colors
- update git ignore to include static folder

## v2.0.0
### Changed
- Alert close button changed from Icon to ActionTriggerButton

### Removed
- Alert.attr.closeIcon

### Added
- Alert.attr.closeButtonTitle
