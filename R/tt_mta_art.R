#' Plot MTA Permanent Art Catalog
#'
#' Output D3 plot for the 2025-07-22 TidyTuesday dataset.
#'
#' @import htmlwidgets
#'
#' @export
tt_mta_art <- function(data, width = NULL, height = NULL, elementId = NULL) {
  # forward options using x
  x = list(
    data = data
  )

  # create widget
  htmlwidgets::createWidget(
    name = 'tt_mta_art',
    x,
    width = width,
    height = height,
    package = 'berkeTidyTuesday',
    elementId = elementId
  )
}
