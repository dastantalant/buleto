WITH _timeline AS (SELECT timeline.timeline_id AS timeline,
                          cell.cell_number     AS cell
                   FROM timeline
                            INNER JOIN cell_victory ON timeline.timeline_id = cell_victory.timeline_id
                            INNER JOIN cell ON cell_victory.cell_id = cell.cell_id
                   WHERE is_bullet = TRUE
                   ORDER BY timeline.timeline_id DESC
                   OFFSET 0 LIMIT 1000)
SELECT jsonb_agg(row_to_json(_timeline)) AS json
FROM _timeline

WITH _timeline AS (SELECT COUNT(timeline.timeline_id) AS count,
                          cell.cell_number            AS cell
                   FROM timeline
                            INNER JOIN cell_victory ON timeline.timeline_id = cell_victory.timeline_id
                            INNER JOIN cell ON cell_victory.cell_id = cell.cell_id
                   WHERE is_bullet = TRUE
                     AND timeline.line BETWEEN '2025-03-20 00:00:00'::timestamp AND '2025-03-21 00:00:00'::timestamp
                   ORDER BY cell.cell_number GROUP BY cell)
SELECT jsonb_agg(row_to_json(_timeline)) AS json
FROM _timeline

SELECT COUNT(timeline.timeline_id) AS count,
       cell.cell_number            AS cell
FROM timeline
         INNER JOIN cell_victory ON timeline.timeline_id = cell_victory.timeline_id
         INNER JOIN cell ON cell_victory.cell_id = cell.cell_id
WHERE is_bullet = TRUE
  AND timeline.line BETWEEN '2025-03-20 00:00:00'::timestamp AND '2025-03-21 00:00:00'::timestamp
ORDER BY cell.cell_number GROUP BY cell

SELECT timeline.timeline_id, cell.cell_number AS cell
FROM timeline
         INNER JOIN cell_victory ON timeline.timeline_id = cell_victory.timeline_id
         INNER JOIN cell ON cell_victory.cell_id = cell.cell_id
WHERE is_bullet = TRUE
  AND timeline.line BETWEEN '2025-03-20 00:00:00'::timestamp AND '2025-03-21 00:00:00'::timestamp
ORDER BY cell.cell_number

WITH _timeline AS (SELECT timeline.timeline_id,
                          cell.cell_number AS cell
                   FROM timeline
                            INNER JOIN cell_victory ON timeline.timeline_id = cell_victory.timeline_id
                            INNER JOIN cell ON cell_victory.cell_id = cell.cell_id
                   WHERE is_bullet = TRUE
                     AND timeline.line BETWEEN TO_TIMESTAMP(1742447436739 / 1000) AND TO_TIMESTAMP(1742498014569 / 1000)
                   ORDER BY cell.cell_number)
SELECT jsonb_agg(row_to_json(_timeline)) AS json
FROM _timeline

WITH _timeline AS (SELECT COUNT(timeline.timeline_id) AS count,
                          cell.cell_number            AS cell
                   FROM timeline
                            INNER JOIN cell_victory ON timeline.timeline_id = cell_victory.timeline_id
                            INNER JOIN cell ON cell_victory.cell_id = cell.cell_id
                   WHERE is_bullet = TRUE
                     AND timeline.timeline_id > ?
                     AND timeline.timeline_id < ?
                   GROUP BY cell.cell_number
                   ORDER BY cell.cell_number)
SELECT jsonb_agg(row_to_json(_timeline)) AS json
FROM _timeline









