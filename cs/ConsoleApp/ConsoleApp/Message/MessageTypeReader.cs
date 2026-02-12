namespace ConsoleApp.Message;

using System.Text.Json;

public static class MessageTypeReader
{
    public static MessageType Read(ReadOnlySpan<byte> json)
    {
        var reader = new Utf8JsonReader(json, isFinalBlock: true, state: default);
        while (reader.Read())
        {
            if (reader.TokenType == JsonTokenType.PropertyName && reader.ValueTextEquals("type"))
            {
                reader.Read();
                return reader.GetString() switch
                {
                    "round" => MessageType.Round,
                    "factors" => MessageType.Factor,
                    "last-results" => MessageType.LastResult,
                    _ => throw new JsonException("Unknown message type")
                };
            }
        }
        throw new JsonException("type not found");
    }
}
