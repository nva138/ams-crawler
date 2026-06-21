package at.amscrawler.backend.jobposting;

import java.time.LocalDate;

public record JobPostingResponseDTO(Long id, String title, String company, String location, String description, String url, LocalDate lastUpdatedAt){
}
