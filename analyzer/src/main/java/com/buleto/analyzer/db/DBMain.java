package com.buleto.analyzer.db;

import com.buleto.core.model.Round;
import com.buleto.core.service.CsvService;
import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.LinkedList;
import java.util.List;

public class DBMain {
    private static HikariDataSource dataSource;
    static  {
        HikariConfig config = new HikariConfig();
        config.setJdbcUrl("jdbc:postgresql://localhost:5432/buleto_b");

        config.setUsername("postgres");
        config.setPassword("postgres");
        config.setMaximumPoolSize(10);
        config.setMinimumIdle(2);
        config.setConnectionTimeout(30000);
        config.setIdleTimeout(600000);
        config.addDataSourceProperty("cachePrepStmts", "true");
        config.addDataSourceProperty("prepStmtCacheSize", "250");
        config.addDataSourceProperty("prepStmtCacheSqlLimit", "2048");
        config.addDataSourceProperty("useServerPrepStmts", "true");
        dataSource = new HikariDataSource(config);
    }

    static String SELECT = """
            select
                round.round_id,
                victory_cell_number as cell,
                timeline.wave_id as factor,
                start_datetime as start_time,
                victory_datetime as victory_time
            from round
                inner join timeline on timeline.timeline_id = round.victory_datetime
            order by round.round_id
            """;
    static void main() throws  Exception{
        try (Connection conn = dataSource.getConnection();
             PreparedStatement ps = conn.prepareStatement(SELECT)){
            ResultSet rs = ps.executeQuery();
            List<Round> rounds = new LinkedList<>();
            while(rs.next()){
                rounds.add(Round.builder()
                        .roundId(rs.getInt("round_id"))
                        .cell(rs.getInt("cell"))
                        .factor(rs.getInt("factor"))
                        .startTime(rs.getLong("start_time"))
                        .victoryTime(rs.getLong("victory_time"))
                        .build());
            }
            var service = new CsvService("C:\\Users\\dastan\\Desktop\\rounds");
            service.saveAll(rounds);
        }
    }
}
