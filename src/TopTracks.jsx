
import React, { useEffect, useState, useRef } from 'react';
import TrackItem from './TrackItem.jsx';
import * as d3 from 'd3';

export default function TopTracks() {
  const [tracks, setTracks] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const chartRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem('spotify_access_token');
    if (!token) {
      setError('No access token found.');
      setLoading(false);
      return;
    }
    fetch('https://api.spotify.com/v1/me/top/tracks?limit=10', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.error.message);
        } else {
          setTracks(data.items || []);
        }
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to fetch top tracks.');
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!tracks.length) return;
    // D3 bar chart for popularity
    const svg = d3.select(chartRef.current);
    const width = 700;
    const height = 300;
    svg.selectAll('*').remove();

    svg.attr('width', width).attr('height', height);
    const margin = { top: 30, right: 20, bottom: 60, left: 40 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;

    const x = d3.scaleBand()
      .domain(tracks.map(t => t.name))
      .range([0, chartWidth])
      .padding(0.2);
    const y = d3.scaleLinear()
      .domain([0, d3.max(tracks, t => t.popularity) || 100])
      .range([chartHeight, 0]);

    const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`);

    // X axis
    g.append('g')
      .attr('transform', `translate(0,${chartHeight})`)
      .call(d3.axisBottom(x).tickFormat((d, i) => i + 1))
      .selectAll('text')
      .attr('transform', 'rotate(-45)')
      .style('text-anchor', 'end');

    // Y axis
    g.append('g').call(d3.axisLeft(y));


    // Tooltip div
    let tooltip = d3.select('body').select('.d3-tooltip');
    if (tooltip.empty()) {
      tooltip = d3.select('body')
        .append('div')
        .attr('class', 'd3-tooltip')
        .style('position', 'absolute')
        .style('pointer-events', 'none')
        .style('background', '#222')
        .style('color', '#fff')
        .style('padding', '6px 12px')
        .style('border-radius', '6px')
        .style('font-size', '0.95em')
        .style('opacity', 0)
        .style('z-index', 9999);
    }

    // Bars
    g.selectAll('.bar')
      .data(tracks)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', d => x(d.name))
      .attr('y', d => y(d.popularity))
      .attr('width', x.bandwidth())
      .attr('height', d => chartHeight - y(d.popularity))
      .attr('fill', '#1DB954')
      .on('mouseover', function (event, d) {
        tooltip.transition().duration(150).style('opacity', 0.95);
        tooltip.html(d.name);
        d3.select(this).attr('fill', '#14833b');
      })
      .on('mousemove', function (event) {
        tooltip
          .style('left', (event.pageX + 12) + 'px')
          .style('top', (event.pageY - 24) + 'px');
      })
      .on('mouseout', function () {
        tooltip.transition().duration(200).style('opacity', 0);
        d3.select(this).attr('fill', '#1DB954');
      });

    // Popularity labels
    g.selectAll('.label')
      .data(tracks)
      .enter()
      .append('text')
      .attr('class', 'label')
      .attr('x', d => x(d.name) + x.bandwidth() / 2)
      .attr('y', d => y(d.popularity) - 5)
      .attr('text-anchor', 'middle')
      .attr('font-size', '10px')
      .attr('fill', '#333')
      .text(d => d.popularity);
  }, [tracks]);

  if (loading) return <div className="tracks-loading">Loading top tracks...</div>;
  if (error) return <div className="tracks-error">Error: {error}</div>;

  return (
    <div className="tracks-container">
      <h1 className="tracks-title">Your Top 25 Tracks</h1>
      <div style={{ overflowX: 'auto', marginBottom: 32 }}>
        <svg ref={chartRef} style={{ background: '#fff', borderRadius: 8, boxShadow: '0 2px 8px #0001' }} />
      </div>
      <ol className="tracks-list">
        {tracks.map((track) => (
          <TrackItem key={track.id} track={track} />
        ))}
      </ol>
    </div>
  );
}
