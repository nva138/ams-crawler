package at.amscrawler.backend.crawl;


import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequestMapping("/api/crawl")
public class CrawlController {

    private final CrawlService crawlService;

    public CrawlController(CrawlService crawlService){
        this.crawlService = crawlService;
    }

    @PostMapping
    public void crawl() throws IOException, InterruptedException {
    crawlService.crawl();

    }
}
