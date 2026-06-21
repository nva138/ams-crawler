package at.amscrawler.backend.crawl;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class CrawlScheduler {
private final CrawlService crawlService;

public CrawlScheduler(CrawlService crawlService) {
    this.crawlService = crawlService;
}

@Scheduled(cron = "0 0 6,18 * * *")
public void scheduledCrawl() {
    try {
        crawlService.crawl();
    } catch (Exception e) {
        System.err.println(e.getMessage());
    }
    }
}

