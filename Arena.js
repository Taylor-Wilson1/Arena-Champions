export class Arena
{
    // private static Random random = new Random();

    /// <summary>
    /// Introduces two fighters and starts a match
    /// <parem name="fighter1"> The First Fighter</parem>
    /// <parem name="fighter2">The Second Fighter</parem>
    /// </summary>

    FightMatch ( fighter1,  fighter2)
    {
        Console.WriteLine(`Welcome to the Arena! Please welcome ${fighter1.Name}` +
                          ` to the stage! AND NOW introducing ${fighter2.Name} to the STAGE!\n\n` +
                          `${fighter1.Name} has ${fighter1.HealthPoints} health and ${fighter2.Name} has ${fighter2.HealthPoints}`);

        // MakeAMove(fighter1, fighter2);
    }
}