import React, { useContext } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const FitnessDataContext = React.createContext();

export function useFitnessData() {
  return useContext(FitnessDataContext);
}

// Array of objects describing each type of fitness card
export const fitnessCategory = [
  {
    name: "walk",
    color: "green",
    units: "km",
    unitStep: 0.1,
    measure: "distance",
    defaultGoal: 5,
    doubleInput: false
  },
  {
    name: "workout",
    color: "orange",
    units: "hrs",
    unitStep: 1,
    measure: "time",
    defaultGoal: [2,0],
    doubleInput: true
  },
  {
    name: "water",
    color: "blue",
    units: "glasses",
    unitStep: 1,
    measure: "glass",
    defaultGoal: 8,
    doubleInput: false
  },
  {
    name: "sleep",
    color: "purple",
    units: "hrs",
    unitStep: 1,
    measure: "time",
    defaultGoal: [8,0],
    doubleInput: true
  }
];

export const FitnessDataProvider = ({ children }) => {
  // Get archived data
  const [archivedData, setArchivedData] = useLocalStorage("archivedData", []);

  // Set fitnessData to local storage value, else to default data
  const defaultData = [];
  fitnessCategory.forEach(category => {
    const card = {};
    card.name = category.name;
    card.date = new Date();
    card.count = category.doubleInput ? [0,0] : 0;
    card.goal = category.defaultGoal;

    defaultData.push(card);
  });
  const [fitnessData, setFitnessData] = useLocalStorage("fitnessData", defaultData);

  // === FUNCTIONS TO CREATE, READ AND UPDATE FITNESS DATA ===

  // Reset counters to 0 each day
  function resetDailyData() {
    // Get previous goals to reuse them
    const previousGoals = {};
    fitnessCategory.forEach(category => {
      previousGoals[category.name] = getFitnessData(category.name).goal;
    });

    // Generate an archive
    const globalProgress = getDailyProgress();
    archiveData(globalProgress);

    // Delete data
    fitnessCategory.forEach(category => {
      deleteFitnessData(category.name);
    });

    // Create new data object and set it as current fitness data
    const newDataArray = [];
    fitnessCategory.forEach(category => {
      const newFitnessData = {};
      newFitnessData.name = category.name;
      newFitnessData.date = new Date();
      newFitnessData.count = category.doubleInput ? [0,0] : 0;
      newFitnessData.goal = previousGoals[category.name];
      
      newDataArray.push(newFitnessData);
    })
    setFitnessData(newDataArray);
  }

  // Get fitness data based on name, i.e. "walk"
  function getFitnessData(name) {
    return fitnessData.find(data => data.name === name);
  }

  // Delete current day fitness data with given name
  function deleteFitnessData(name) {
    setFitnessData(previousData => {
      return previousData.filter(data => data.name !== name);
    });
  }

  // Update count or goal of fitness data with given name
  function updateFitnessData(name, { count, goal }) {
    deleteFitnessData(name);
    // Create new data item and append to fitnessData
    const newData = {
      name: name,
      date: new Date(),
      count: count,
      goal: goal
    };

    setFitnessData(previousData => {
      return [...previousData, newData]
    });
  }

  // Return the global progress combining each card data
  function getDailyProgress() {
    const progressArray = []; // Array to store each category's progress
    fitnessCategory.forEach(category => {
      const cardFitnessData = getFitnessData(category.name);
      let cardFitnessProgress = category.doubleInput ? (
        (60 * parseInt(cardFitnessData.count[0]) + parseInt(cardFitnessData.count[1]))
        / (60 * parseInt(cardFitnessData.goal[0]) + parseInt(cardFitnessData.goal[1]))
      ) : (
        cardFitnessData.count / cardFitnessData.goal
      );

      if (cardFitnessProgress >= 1) cardFitnessProgress = 1;

      progressArray.push(cardFitnessProgress);
    });    

    const progress = progressArray.reduce((total, num) => total += num, 0);
    return progress * 0.25;
  }

  // Create an archive object and save it to local storage
  function archiveData(globalProgress) {
    const newArchive = {
      date: getFitnessData("walk").date,
      globalProgress: globalProgress
    };
    fitnessCategory.forEach(category => {
      newArchive[category.name] = {};
      newArchive[category.name].count = getFitnessData(category.name).count;
      newArchive[category.name].goal = getFitnessData(category.name).goal;
    });

    setArchivedData(previousData => {
      return [...previousData, newArchive];
    });
  }

  return <FitnessDataContext.Provider value={{
    fitnessData,
    archivedData,
    getFitnessData,
    updateFitnessData,
    getDailyProgress,
    resetDailyData
  }}>
    {children}
  </FitnessDataContext.Provider>
}