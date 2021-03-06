#!/usr/bin/env node

var path = require('path');
var program = require('commander');
var monthly = require(path.join('..', 'cjs'));
var today = new Date;
var day = today.getDate();
var month = today.getMonth();
var year = today.getFullYear();
var date = new Date(year, month, 1);

var _holidaysFilter = /^(?:[a-z]{2},)*(?:[a-z]{2})$/i;
var _holidays =  {
  national: [],
  regional: []
};
var options = {
  date: date,
  highlight: day,
  startDay: 1,
  year: true,
  _holidays: _holidays
};

program
  .option('--holidays <cc>', 'dim holidays for an ISO 3166 country (de gb it us) and underline if national.', _holidaysFilter)
  .option('-m, --month <mm>', 'display a calendar for the month.', /^(?:(?:0?[1-9])|(?:1[012]))$/, month + 1)
  .option('-y, --year [yyyy]', 'display a calendar for the whole year. (default: ' + year + ')', /^[12][0-9]{3}$/)
  .option('-s, --sunday', 'display Sunday as the first day of the week.')
  .option('-3, --three', 'display three months spanning the date.')
  .version(require(path.join('..', 'package.json')).version, '-v, --version')
  .parse(process.argv);

if (program.sunday)
  options.startDay = 0;

var hasMonth = typeof program.month === 'string';
var hasYear = !!program.year;
var hasThree = !!program.three;

if (hasMonth)
  date.setMonth(parseInt(program.month, 10) - 1);

if (hasYear && typeof program.year === 'string') {
  if (/^\d{4}$/.test(program.year))
    date.setFullYear(parseInt(program.year, 10));
  else {
    program.help();
    process.exit();
  }
}

if (program.holidays) {
  if (_holidaysFilter.test(program.holidays)) {
    program.holidays.toLowerCase().split(',').forEach(
      function (lang) {
        try {
          var module = require(path.join('..', 'holidays', lang, 'index.js'));
          this.national.push.apply(
            this.national,
            module.national.map(addYear, date.getFullYear()).filter(nulled)
          );
          this.regional.push.apply(
            this.regional,
            module.regional.map(addYear, date.getFullYear()).filter(nulled)
          );
        } catch (nope) {}
      },
      _holidays
    );
    _holidays.regional.push.apply(
      _holidays.regional,
      _holidays.national
    );
  } else {
    program.help();
    process.exit();
  }
}

if (hasThree) {
  var currentMonth = date.getMonth();
  var currentYear = date.getFullYear();
  date.setMonth(currentMonth - 1);
  setHighlight(currentMonth - 1);
  var output = monthly(options);
  date.setMonth(currentMonth);
  date.setFullYear(currentYear);
  setHighlight(currentMonth);
  output.forEach(addMonth, monthly(options));
  date.setMonth(currentMonth + 1);
  setHighlight(currentMonth + 1);
  output.forEach(addMonth, monthly(options));
  console.log(output.join('\n'));
} else if (hasYear && !hasMonth) {
  date.setMonth(0);
  setHighlight(0);
  var output = [monthly(options)];
  for (var i = 1, j; i < 12; i++) {
    j = Math.floor(i / 3);
    date.setMonth(i);
    setHighlight(i);
    if (j === output.length)
      output[j] = monthly(options);
    else
      output[j].forEach(addMonth, monthly(options));
  }
  console.log(output.map(newLine).join('\n'));
} else if (!hasYear) {
  console.log(monthly(options).join('\n'));
} else {
  program.help();
}

function addMonth(line, i, arr) {
  arr[i] = line + '  ' + this[i];
}

function addYear(mmdd) {
  return typeof mmdd === 'string' ?
          new Date(this + '-' + mmdd) :
          mmdd(+this);
}

function newLine(lines) {
  return lines.join('\n');
}

function nulled(date) {
  return date != null;
}

function setHighlight(i) {
  options.highlight = i === month &&
                      date.getFullYear() === year ? day : 0;
}
