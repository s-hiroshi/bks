export const createChoices = (choices: string[], actions: string[]): string[] => {
    actions.forEach((action, index) => {
        choices.push(action);
    })

    return choices;
}