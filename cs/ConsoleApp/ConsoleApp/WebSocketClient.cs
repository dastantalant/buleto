using System.Net.WebSockets;
using ConsoleApp.Message;

namespace ConsoleApp;

public static class WebSocketClient
{
    public static async Task ConnectAndListenAsync(string uri = "wss://buleto.com/ws")
    {
        using var ws = new ClientWebSocket();
        await ws.ConnectAsync(new Uri(uri), CancellationToken.None);

        var buffer = new byte[8192];

        while (true)
        {
            var result = await ws.ReceiveAsync(buffer, CancellationToken.None);
            if (result.MessageType == WebSocketMessageType.Close) return;
            if (result.MessageType != WebSocketMessageType.Text) continue;
            var span = buffer.AsSpan(0, result.Count);
            var message = MessageFactory.Deserialize(span);
            Handle(message);
        }
    }

    private static void Handle(IMessage message)
    {
        switch (message)
        {
            case RoundMessage m:
                Holder.Rounds.Handle(m.Data);
                break;
            case FactorMessage m:
                Holder.Factors.Handle(m.Data);
                break;
            case LastResultMessage m:
                break;
        }
    }
}