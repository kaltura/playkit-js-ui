#  UI manager services

The UI manager tries to separate concerns by allowing UI components to handle the presentational aspects.  
In order to enable advanced use cases the manager exposes services as HoC that can inject those service to the component   
without it having to take care of initialization or cleanup of the services.
The available services are:
* [withPlayer](./with-player.md) - exposes player instance to the component
* [withLogger](./with-logger.md) - exposes logger instance to the component
* [withEventManager](./with-logger.md) - exposes event manager instance to the component
