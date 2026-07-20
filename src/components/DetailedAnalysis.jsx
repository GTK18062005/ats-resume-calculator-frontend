import React from 'react';
import { Card, CardContent, Typography, Grid, Chip, Box } from '@mui/material';
import { 
  ThumbUp, 
  ThumbDown, 
  Lightbulb, 
  Warning,
  CheckCircle,
  Cancel
} from '@mui/icons-material';

const DetailedAnalysis = ({ analysis }) => {
  if (!analysis) return null;

  const { detailedAnalysis, feedback, modelUsed, processingTime } = analysis;

  return (
    <Card sx={{ mt: 3, borderRadius: 3, boxShadow: 3 }}>
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              📊 Detailed Analysis
            </Typography>
            <Typography variant="body2" color="textSecondary">
              Model: {modelUsed} | Processing Time: {processingTime}ms
            </Typography>
          </Grid>

          {feedback && (
            <Grid item xs={12}>
              <Box sx={{ bgcolor: '#f5f5f5', p: 2, borderRadius: 2 }}>
                <Typography variant="subtitle2" color="primary">
                  Feedback
                </Typography>
                <Typography variant="body2">{feedback}</Typography>
              </Box>
            </Grid>
          )}

          {detailedAnalysis && (
            <>
              {/* Strengths */}
              {detailedAnalysis.strengths && detailedAnalysis.strengths.length > 0 && (
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" gutterBottom>
                    <ThumbUp sx={{ color: '#4CAF50', mr: 1 }} />
                    Strengths
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {detailedAnalysis.strengths.map((item, idx) => (
                      <Chip key={idx} label={item} color="success" size="small" />
                    ))}
                  </Box>
                </Grid>
              )}

              {/* Improvements */}
              {detailedAnalysis.improvements && detailedAnalysis.improvements.length > 0 && (
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" gutterBottom>
                    <Lightbulb sx={{ color: '#FF9800', mr: 1 }} />
                    Improvements
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {detailedAnalysis.improvements.map((item, idx) => (
                      <Chip key={idx} label={item} color="warning" size="small" />
                    ))}
                  </Box>
                </Grid>
              )}

              {/* Missing Keywords */}
              {detailedAnalysis.missingKeywords && detailedAnalysis.missingKeywords.length > 0 && (
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" gutterBottom>
                    <Cancel sx={{ color: '#f44336', mr: 1 }} />
                    Missing Keywords
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {detailedAnalysis.missingKeywords.map((item, idx) => (
                      <Chip key={idx} label={item} color="error" size="small" />
                    ))}
                  </Box>
                </Grid>
              )}

              {/* Sections Found */}
              {detailedAnalysis.sectionsFound && detailedAnalysis.sectionsFound.length > 0 && (
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" gutterBottom>
                    <CheckCircle sx={{ color: '#4CAF50', mr: 1 }} />
                    Sections Found
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {detailedAnalysis.sectionsFound.map((item, idx) => (
                      <Chip key={idx} label={item} color="primary" size="small" />
                    ))}
                  </Box>
                </Grid>
              )}

              {/* Suggested Keywords */}
              {detailedAnalysis.suggestedKeywords && detailedAnalysis.suggestedKeywords.length > 0 && (
                <Grid item xs={12}>
                  <Typography variant="subtitle2" gutterBottom>
                    <Lightbulb sx={{ color: '#FF9800', mr: 1 }} />
                    Suggested Keywords to Add
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {detailedAnalysis.suggestedKeywords.map((item, idx) => (
                      <Chip key={idx} label={item} variant="outlined" color="warning" size="small" />
                    ))}
                  </Box>
                </Grid>
              )}
            </>
          )}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default DetailedAnalysis;