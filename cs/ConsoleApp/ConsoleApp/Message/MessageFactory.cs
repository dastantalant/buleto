using System.Text.Json;

namespace ConsoleApp.Message;

public static class MessageFactory
{
    private static readonly JsonSerializerOptions Options = new()
    {
        PropertyNameCaseInsensitive = true
    };

    public static IMessage Deserialize(ReadOnlySpan<byte> json)
    {
        var type = MessageTypeReader.Read(json);
        return type switch
        {
            MessageType.Round => JsonSerializer.Deserialize<RoundMessage>(json, Options)!,
            MessageType.Factor => JsonSerializer.Deserialize<FactorMessage>(json, Options)!,
            MessageType.LastResult => JsonSerializer.Deserialize<LastResultMessage>(json, Options)!,
            _ => throw new JsonException($"Unsupported type {type}")
        };
    }
}