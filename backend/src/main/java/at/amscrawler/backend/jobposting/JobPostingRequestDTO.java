package at.amscrawler.backend.jobposting;

import java.time.LocalDate;

public record JobPostingRequestDTO(String title, String company, String location, String description, String url, LocalDate lastUpdatedAt){
}
