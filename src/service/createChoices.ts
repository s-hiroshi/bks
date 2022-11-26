export const createChoices = (choices: string[], actions: string[]): string[] => {
    actions.forEach((action) => {
        choices.unshift(action);
    })

    return choices;
}