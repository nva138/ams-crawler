package at.amscrawler.backend.jobposting;

public record JobPostingResponseDTO(Long id, String title, String company, String location, String description, String url){
}
