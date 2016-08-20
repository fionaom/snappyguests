#!/bin/bash

echo "Downloading Polaroids"
i="0"

while [ $i -lt 211 ]
do
webkit2png -F --ignore-ssl-check http://m.snappyguests.com/messages/polaroid/$i
i=$[$i+1]
done
