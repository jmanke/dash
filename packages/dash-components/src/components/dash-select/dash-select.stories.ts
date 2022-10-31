export default {
  title: 'Components/Dash Select',
};

const Template = () => `
<dash-select>
    <option value="test 1">test 1</option>
    <option value="test 2">test 2</option>
    <option value="test 3">test 3</option>
    <option value="test 4">test 4</option>
    <option value="test 5">test 5</option>
</dash-select>
`;

export const DefaultScrim = Template.bind({});
DefaultScrim.args = {
  active: true,
};
