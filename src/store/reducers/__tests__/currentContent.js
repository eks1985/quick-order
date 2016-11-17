import reducer from './../current-content';


describe('reducer currentContent', () => {
  it('should handle actions', () => {
    const action = { type: 'SET_CURRENT_CONTENT', contentName: 'help' };
    const expected = 'help'
    const actual = reducer(undefined, action);
    expect(actual).toEqual(expected);
  });
});
