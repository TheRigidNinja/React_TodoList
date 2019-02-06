const initState = {
  Todos:0,
  DoneTodos: { key: [], timedate: [], value: [] },
  FailedTodos: { key: [], timedate: [], value: [] },
  Quote: {}
};

const todosReducer = (state = initState, action) => {
  if (action.type === "ADDLIST") { return { ...state, Todos: action.data }; }
  if (action.type === "DONELIST") { return { ...state, DoneTodos: action.data }; }
  if (action.type === "FAILEDLIST") { return { ...state, FailedTodos: action.data }; }
  if (action.type === "QUOTE") { return { ...state, Quote: action.data }; }
  return state;
};

export default todosReducer