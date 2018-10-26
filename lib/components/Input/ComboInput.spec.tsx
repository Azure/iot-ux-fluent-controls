import { describe, it } from 'mocha';

describe('<ComboInput />', () => {
    // TODO: recreate tests once DropDown is fixed or removed
    it('should open drop down when input receives focus');

    it('closes dropdown when the text input field loses focus (bug 1608336)');

    it('does not throw an error when the user hits enter without selecting an option (bug 1608338)');

    it('does not show a dropdown when props.options is empty (bug 1619044)');
});
