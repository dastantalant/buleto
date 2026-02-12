using ConsoleApp.Message;

namespace ConsoleApp;

public static class Holder
{
    private static CryptoRandom random = new();
    private static double begin;
    private static double target;

    public static class Factors
    {
        private static readonly Dictionary<long, double> Dictionary = new();
        private static long lastKey;
        private static double last;
        private static long las = 0L;

        private const double Tolerance = 0.00001;

        public static void Handle(List<Factor> factors)
        {
            Handle0(factors);
        }

        private static void Handle0(List<Factor> factors)
        {
            foreach (var factor in factors)
            {
                var key = factor.DateTime.UtcTicks;
                if (Dictionary.ContainsKey(key))
                    continue;
                var number = factor.Value;
                Dictionary[key] = number;
                var diff = key - las;
                Console.WriteLine($"{factor.DateTime:HH:mm:ss.fffffff} : {number} {key} {diff}");
                las = key;
            }
        }

        private static void Handle1(List<Factor> factors)
        {
            foreach (var factor in factors)
            {
                var key = factor.DateTime.UtcTicks;
                if (Dictionary.ContainsKey(key))
                    continue;
                Dictionary[key] = factor.Value;
                var spin1 = random.Spin(begin, target);
                var spin2 = random.SpinAlternative(begin, target);
                Console.WriteLine($"{factor.DateTime:HH:mm:ss.fffffff} : {factor.Value} [{spin1},{spin2}]");
            }
        }

        private static void Handle2(List<Factor> factors)
        {
            foreach (var factor in factors)
            {
                var key = factor.DateTime.UtcTicks;
                if (!Dictionary.TryGetValue(key, out _))
                {
                    Dictionary[key] = factor.Value;
                    if (!AreEqual(last, factor.Value))
                    {
                        var spin1 = random.Spin(begin, target);
                        var spin2 = random.SpinAlternative(begin, target);
                        Console.WriteLine($"{factor.DateTime:HH:mm:ss.fffffff} : {factor.Value:F5} [{spin1},{spin2}]");
                        last = Math.Round(factor.Value, 5);
                    }

                    lastKey = key;
                }
            }
        }

        private static int GetFractionalPart(double number)
        {
            var fractional = Math.Abs(number) - Math.Abs(Math.Truncate(number));
            if (fractional == 0.0) return 0;
            var result = (long)Math.Round(fractional * 1e15);
            while (result % 10 == 0 && result > 0)
            {
                result /= 10;
            }

            return (int)result;
        }

        private static bool AreEqual(double a, double b, double tolerance = Tolerance)
        {
            return Math.Abs(a - b) <= tolerance;
        }

        private static bool AreEqualRelative(double a, double b, double tolerance = Tolerance)
        {
            if (a == b) return true;
            var diff = Math.Abs(a - b);
            var max = Math.Max(Math.Abs(a), Math.Abs(b));
            if (max < tolerance) return true;
            return diff / max <= tolerance;
        }

        private static bool AreEqualDecimal(double a, double b, int decimals = 5)
        {
            var decA = (decimal)a;
            var decB = (decimal)b;
            decA = Math.Round(decA, decimals);
            decB = Math.Round(decB, decimals);
            return decA == decB;
        }
    }

    public static class Rounds
    {
        private static readonly Dictionary<long, Round> Dictionary = new();

        public static void Handle(Round round)
        {
            if (Dictionary.TryAdd(round.Id, round))
            {
                begin = round.Begin - 0.00190;
                target = round.Target + 0.00190;
                Console.WriteLine(round);
            }

            if (round.Victory != null && Dictionary[round.Id].Victory == null)
            {
                Dictionary[round.Id] = round;
                Console.WriteLine(
                    $"{round.Victory.DateTime:HH:mm:ss.fffffff} : {round.Victory.Value} : {round.Victory.Cell}");
            }
        }
    }
}