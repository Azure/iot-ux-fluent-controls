# CHANGELOG

## v5.2.1
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
