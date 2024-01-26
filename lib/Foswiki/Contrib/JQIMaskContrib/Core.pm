# Extension for Foswiki - The Free and Open Source Wiki, http://foswiki.org/
#
# JQIMaskContrib is Copyright (C) 2023 Michael Daum http://michaeldaumconsulting.com
#
# This program is free software; you can redistribute it and/or
# modify it under the terms of the GNU General Public License
# as published by the Free Software Foundation; either version 2
# of the License, or (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
# GNU General Public License for more details, published at
# http://www.gnu.org/copyleft/gpl.html

package Foswiki::Contrib::JQIMaskContrib::Core;

use strict;
use warnings;

use Foswiki::Contrib::JQIMaskContrib ();
use Foswiki::Plugins::JQueryPlugin::Plugin ();
our @ISA = qw( Foswiki::Plugins::JQueryPlugin::Plugin );

sub new {
  my $class = shift;

  my $this = bless(
    $class->SUPER::new(
      name => 'IMask',
      version => $Foswiki::Contrib::JQIMaskContrib::VERSION,
      author => "Alexey Kryazhev",
      homepage => 'https://imask.js.org/',
      javascript => ['pkg.js'],
      puburl => '%PUBURLPATH%/%SYSTEMWEB%/JQIMaskContrib',
      dependencies => ['sprintf'],
    ),
    $class
  );

  return $this;
}

1;
