using System.Text.Json.Serialization;

namespace ConsoleApp.Message;

public class Round
{
    [JsonPropertyName("id")] public long Id { get; set; }
    [JsonPropertyName("s")] public int Sector { get; set; }

    [JsonPropertyName("bv")] public double Begin { get; set; }
    [JsonPropertyName("tv")] public double Target { get; set; }
    [JsonPropertyName("sv")] public double Start { get; set; }

    [JsonPropertyName("sd")] public DateTimeOffset StartDateTime { get; set; }
    [JsonPropertyName("ed")] public DateTimeOffset EndDateTime { get; set; }
    [JsonPropertyName("btd")] public DateTimeOffset BetTargetDateTime { get; set; }
    [JsonPropertyName("bcd")] public DateTimeOffset BetCancelDateTime { get; set; }

    [JsonPropertyName("rr")] public VictoryCell? Victory { get; set; }

    private List<Cell> _cells = [];

    [JsonPropertyName("cls")]
    public List<Cell> Cells
    {
        get => _cells;
        set => _cells = value ?? [];
    }

    public override string ToString() =>
        $"{DateTimeOffset.Now:HH:mm:ss.fffffff} : {Id}[{Sector}] [{Begin:F5} {Start:F5} {Target:F5}] Start[{StartDateTime:HH:mm:ss}] Cancel[{BetCancelDateTime:HH:mm:ss}] Target[{BetTargetDateTime:HH:mm:ss}] End[{EndDateTime:HH:mm:ss}]";
}