import com.traderoom.analyzer.ProjectDump;
import com.traderoom.strategy.StrategyMain;

void main() throws IOException {
    ProjectDump.of(StrategyMain.class.getPackage())
//            .lineImport(true)
            .linePackage(true)
            .debug()
            .write();
}

