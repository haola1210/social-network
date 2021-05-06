import React from 'react';

const GroupContext = React.createContext({
    _id: "",
    name: "",
})

const GroupProvider = GroupContext.Provider
const GroupConsumer = GroupContext.Consumer

export { GroupContext, GroupProvider, GroupConsumer }