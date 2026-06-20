package at.amscrawler.backend.crawl;

import org.springframework.stereotype.Component;

import java.io.File;
import java.io.IOException;
import java.nio.charset.StandardCharsets;

@Component
public class ScraperProcessRunner {

    public String runScraper() throws IOException, InterruptedException {

        ProcessBuilder processBuilder = new ProcessBuilder("npx", "tsx", "scraper.ts")
                .directory(new File("/Users/maxmayer/dev/ams-crawler/scraper"));
        Process process = processBuilder.start();

        String json = new String(process.getInputStream().readAllBytes(), StandardCharsets.UTF_8);
        int exitCode = process.waitFor();

        if(exitCode != 0) {
            throw new RuntimeException("Exitcode: " + exitCode);
        }


        return json;
    }
}
