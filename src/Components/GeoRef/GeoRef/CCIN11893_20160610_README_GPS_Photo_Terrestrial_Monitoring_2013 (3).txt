README Geo-referenced digital photographs with associated GPS waypoints and tracks for terrestrial ecosystem types
Cambridge Bay, 2013



1. Directory Structure:
------
Waypoints were taken with two GPS, Montana 1 and 2. Therefore, two folders were created to separate the waypoints (Montana 1 and 2).

Main Folder and Subfolder:
Waypoints_Tracks
Garmin_Montana_1
Garmin_Montana_2


Photographs
YYYYMMDD (YYYY = Year; MM = Month; DD = Day)



2. File Names:
------
Waypoint datafile names are constructed as follow:
Type_DD-MMM-YY.gpx or txt (Type = Waypoint or track; DD = Day; MMM = Month; YY = Year) 

Photographs datafile names are constructed as follow:
DSCxxxxx_ZZ.jpg (DSCxxxxx = Photo number attributed automatically in the SD card; ZZ = M1, M2 to ID the GPS)

Not all photos has GPS assigned in their file names (M1 or M2). Some have "camo" which means that they were taken by another camera.
The photos without a GPS associated to them were taken by a Coolpix AW 110 and a Panasonic DMC-TS4 camera.



3. Definition of the content
------
The content of the waypoints and tracks include:

Short Name          Long Name           Units
Time                Time                UTC
lat                 Latitude            Degree Decimals
Long                Longitude           Degree Decimals
Elev                Elevation           Meter


The waypoints and tracks are available in two formats, gpx and txt. 

The geolocation information of the photographs is included in the Exif (exchangeable image file format) information of the image file.

Some photos may not have an exif file associated to them. Referring to the waypoints and tracks for geolocation information may be possible in this case. 



4. Methods for processing:
------

Geo-referenced digital photographs record site, soil and vegetation characteristics of arctic ecosystems. The location and type of the various ecosystems is further documented by GPS waypoints. 

Geo-referenced photographs and GPS waypoints are overlaid on satellite imagery in a GIS software. Matching pixel colours of the satellite images with different ecosystem types in the field helps developing an ecosystem model over large areas.



5. Specialized software:
------

Garmin Basecamp for visualizing and editing GPS waypoints and tracks.

An Exif viewer software to visualizing Exif information of digital photographs.

GIS software such as ArcGIS or Global Mapper for overlaying and processing waypoints, geo-referenced photographs and satellite imagery




